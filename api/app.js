import 'dotenv/config';
import cluster from 'cluster';
import os from 'os';

import app from './src/index.js';
const cpuCount = os.cpus().length;

const { PORT } = process.env;


if (cluster.isMaster) {
    // Fork workers.
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    // Listen for dying workers.
    cluster.on('exit', () => {
        // Replace the dead worker, we're not sentimental
        cluster.fork();
    })
} else {
    app.listen(PORT, () => {
        console.log(`Server is running on PID:${process.pid} port ${PORT}`);
    }
    );
}
