import express from 'express';
import authRouter from './routes/auth.js';

const app = express();

app.get('/', async (req, res) => {
    res.send(process.env.PORT);
})

app.use('/auth', authRouter);

export default app;