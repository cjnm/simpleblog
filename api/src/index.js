import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.js';
import blogRouter from './routes/blog.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/blog', blogRouter);

export default app;