import express from 'express';
import pool from '../db.js';
import {authenticateToken} from '../middleware/auth.js';

// Routes under '/api/tasks'
const router = express.Router();

// creates a new tast
router.post('/', authenticateToken, async (req, res) => {
  try {
console.log(req.user)
    const tasks = await pool.query(
      'INSERT INTO tasks (title,description,created_by) VALUES ($1,$2,$3) RETURNING *',
      [req.body.title, req.body.description, req.user.user_id]);

    const newTask = tasks.rows[0];
    
    res.json({
      taskId: newTask.id,
      title: newTask.title,
      description: newTask.description,
      completed: newTask.completed
    });

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});



export default router;