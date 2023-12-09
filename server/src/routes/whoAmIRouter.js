import express from 'express';
import {authenticateToken} from '../middleware/auth.js';
import pool from '../db.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const {user_id, user_email, user_name} = req.user;
        const developerIds = await pool.query('SELECT * FROM developers WHERE user_id = $1', [user_id]);
        res.json({user: {
            userId: user_id,
            name: user_name,
            email: user_email,
            clientId: developerIds.rows[0] ? developerIds.rows[0].client_id : undefined
        }});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default router;