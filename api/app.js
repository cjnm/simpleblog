import 'dotenv/config';
import app from './src/index.js';

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})