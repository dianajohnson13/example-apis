import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';

import usersRouter from './src/routes/usersRouter.js';
import authRouter from './src/routes/authRouter.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());

// routes
app.use('/', express.static(join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
