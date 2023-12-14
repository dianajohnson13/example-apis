import express from 'express';
import pool from '../db.js';
import {authenticateToken} from '../middleware/auth.js';

// Routes under '/api/tasks'
const router = express.Router();


// gets user's tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasksData = await pool.query('SELECT * FROM tasks WHERE created_by = $1', [req.user.user_id]);

    const tasks = tasksData.rows.map(task => {
      return {
        taskId: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed
      }
    });
    
    res.json({ tasks });

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// creates a new tast
router.post('/', authenticateToken, async (req, res) => {
  try {
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