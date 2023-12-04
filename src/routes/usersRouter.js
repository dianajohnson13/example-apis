import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import { genAPIKey } from '../utils/auth.js';
import { authenticateToken } from '../middleware/auth.js';

// Routes under '/api/users'
const router = express.Router();

router.post('/', async (req, res) => {
    // Request body: { password: string, email: string, name: string }
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // add them to the db
    const users = await pool.query(
      'INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *',
      [req.body.name, req.body.email, hashedPassword]);
    // return the new user
    const newUser = users.rows[0];
    res.json({user: {
      userId: newUser.user_id,
      name: newUser.user_name,
      email: newUser.user_email
    }});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.post('/apikey', authenticateToken, async (req, res) => {
    try {
      const { user_id } = req.user;
      // generate a new key
      const newKey = genAPIKey();
      // hash new key
      const hashedKey = await bcrypt.hash(newKey, 10);
      // add it to the db
      const dev = await pool.query(
        'INSERT INTO developers (user_id,api_key) VALUES ($1,$2) RETURNING *',
        [user_id, hashedKey]);
      // return the new user
      const newDev = dev.rows[0];

      res.json({apikey: newKey, clientId: newDev.client_id});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

export default router;