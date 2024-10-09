// server.js
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

// Sensitive data is taken from environment variables
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const POOL_URL = process.env.POOL_URL;
const POOL_PORT = process.env.POOL_PORT;

// Keep track of the mining process
let miningProcess = null;

app.use(express.static('public'));

app.post('/start-mining', (req, res) => {
    if (!miningProcess) {
        miningProcess = exec(`xmrig -o ${POOL_URL}:${POOL_PORT} -u ${WALLET_ADDRESS} --donate-level 1`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error during mining: ${error}`);
                res.status(500).send({ message: 'Error starting mining' });
                return;
            }
            console.log(`Mining output: ${stdout}`);
        });

        res.status(200).send({ message: 'Mining started' });
    } else {
        res.status(400).send({ message: 'Mining is already running' });
    }
});

app.post('/stop-mining', (req, res) => {
    if (miningProcess) {
        miningProcess.kill();
        miningProcess = null;
        res.status(200).send({ message: 'Mining stopped' });
    } else {
        res.status(400).send({ message: 'No mining process running' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
