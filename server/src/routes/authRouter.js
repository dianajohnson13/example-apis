import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import pool from '../db.js';
import { makeTokens } from '../utils/auth.js';

// Routes under '/api/auth'
const router = express.Router();

// login as user with password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // { email: string, password: string }
    const users = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    // CHECK IF USER EXISTS
    if (users.rows.length === 0) return res.status(401).json({error: "Email not found"});
    const user = users.rows[0];

    // CHECK PASSWORD
    const isValidPassword = await bcrypt.compare(password, user.user_password);
    if (!isValidPassword) return res.status(401).json({error: "Invalid password"});

    // IF PASSWORD VALID, RETURN JWT 
    const tokens =  makeTokens(user);
    res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});
    res.status(200).json({...tokens, user: {userId: user.user_id, name: user.user_name}});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// login as a developer with an API key
router.post('/token', async (req, res) => {
  try {
    // get clientId and apikey from req
    const {apiKey, clientId} = req.query; 
    // look up clientId
    const developers = await pool.query('SELECT * FROM developers WHERE client_id = $1', [clientId]);

    // Check if it exists
    if (developers.rows.length === 0) return res.status(401).json({error: "Client not found"});

    // Check if valid
    const isValidKey = await bcrypt.compare(apiKey, developers.rows[0].api_key);
    if (!isValidKey) return res.status(401).json({error: "Invalid key"});

    // look up user
    const users = await pool.query('SELECT * FROM users WHERE user_id = $1', [developers.rows[0].user_id]);

    // RETURN JWT 
    const tokens =  makeTokens(users.rows[0], 'developer');
    res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});


// Uses refresh token to generate new token
  router.get('/refresh_token', (req, res) => {
    try {
      const refreshToken = req.cookies.refresh_token;
      if (refreshToken === null) return res.status(401).json('Missing token');
      // If refresh token is accurate, remake token
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({error});
        let tokens = makeTokens(user);
        res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});
        return res.json(tokens);
      });
    } catch (error) {
      res.status(401).json({error: error.message});
    }
  });


  router.delete('/refresh_token', (req, res) => {
    try {
      res.clearCookie('refresh_token');
      return res.status(200).json({message:'Refresh token deleted.'});
    } catch (error) {
      res.status(401).json({error: error.message});
    }
  });

export default router;