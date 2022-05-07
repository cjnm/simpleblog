import express from 'express';
import authRouter from './routes/auth.js';
import { saveClientInfo } from './model/User.js';

const app = express();

app.get('/', async (req, res) => {
    saveClientInfo();
    res.send(process.env.PORT);
})

app.use('/auth', authRouter);

export default app;