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

      res.json({apiKey: newKey, clientId: newDev.client_id});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

router.delete('/', authenticateToken, async (req, res) => {
  try {
    const clientId = req.query.clientId;
    const { user_id } = req.user;

    const developers = await pool.query('SELECT * FROM developers WHERE client_id = $1', [clientId]);

    if (developers.rows.length === 0) return res.status(404).json({error: "ClientId not found"});
    if (developers.rows[0].user_id !== user_id) return res.status(403).json({error: "ClientId does not belong to authenticated user"});
    
    await pool.query('DELETE FROM developers WHERE client_id = $1', [clientId]);

    return res.status(200).json({message:'API Key and CliendId deleted.'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default router;
