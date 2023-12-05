import express from 'express';
import {authenticateToken} from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const {user_id, user_email, user_name} = req.user;
        res.json({user: {
            userId: user_id,
            name: user_name,
            email: user_email
        }});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default router;