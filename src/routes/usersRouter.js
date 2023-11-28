import express from 'express';
import pool from '../db';
import bcrypt from 'bcrypt';

// Routes under '/api/users'
const router = express.Router();

// TO-DO include auth check
    // router.get('/', async (req, res) => {
    // try {
    //     const users = await pool.query('SELECT * FROM users');
    //     res.json({users : users.rows});
    // } catch (error) {
    //     res.status(500).json({error});
    // }
    // });

router.post('/', async (req, res) => {
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
    res.status(500).json({error});
  }
});

export default router;