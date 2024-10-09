const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000; // Use the environment port or default to 3000

// Define your wallet and pool details
const WALLET_ADDRESS = "YOUR_MONERO_WALLET_ADDRESS"; // Replace with your wallet address
const POOL_URL = "pool.minexmr.com"; // Your mining pool hostname
const POOL_PORT = "4444"; // Change this if needed

app.get("/", (req, res) => {
    res.send("Mining Monero... Check console for logs.");
    // Start the mining process
    const command = `xmrig --url=${POOL_URL}:${POOL_PORT} --user=${WALLET_ADDRESS} --donate-level=1`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
