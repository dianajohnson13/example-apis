import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import { genAPIKey } from '../utils/auth.js';
import { authenticateToken } from '../middleware/auth.js';

// Routes under '/api/developers'
const router = express.Router();

// Creates developer credentials for an existing, authenticated user
router.post('/', authenticateToken, async (req, res) => {
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