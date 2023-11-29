import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import pool from '../db.js';
import { makeTokens } from '../utils/auth.js';

// Routes under '/api/auth'
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // { email: string, password: string }
    const users = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    // CHECK IF USER EXISTS
    if (users.rows.length === 0) return res.status(401).json({error: "Email not found"});
    
    // CHECK PASSWORD
    const isValidPassword = await bcrypt.compare(password, users.rows[0].user_password);
    if (!isValidPassword) return res.status(401).json({error: "Invalid password"});

    // IF PASSWORD VALID, RETURN JWT 
    const tokens =  makeTokens(users.rows[0]);
    res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({error});
  }
});

export default router;