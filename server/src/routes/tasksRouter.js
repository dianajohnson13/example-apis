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
        completed: task.completed,
        createdBy: task.created_by,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
        completedAt: task.completed_at
      }
    });
    
    res.json({ tasks });

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// gets a specific task
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const tasks = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    const task = tasks.rows[0];

    if (!task) return res.status(404).json({error: "Task not found"});
    if (task.created_by !== req.user.user_id) return res.status(403).json({error: "Task does not belong to authenticated user"});

    res.json({
      taskId: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdBy: task.created_by,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
      completedAt: task.completed_at
    });

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// creates a new task
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
      completed: newTask.completed,
      createdBy: newTask.created_by,
      createdAt: newTask.created_at,
      updatedAt: newTask.updated_at,
      completedAt: newTask.completed_at
    });

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;

    const { user_id } = req.user;

    const tasks = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);

    if (tasks.rows.length === 0) return res.status(404).json({error: "Task not found"});
    if (tasks.rows[0].created_by !== user_id) return res.status(403).json({error: "Task does not belong to authenticated user"});
    
    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);

    return res.status(200).json({message:'Task deleted'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default router;