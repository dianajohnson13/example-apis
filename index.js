import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
