from flask import Flask, jsonify
import subprocess
import os

app = Flask(__name__)

# Store the mining process
mining_process = None

# Hardcoded Monero mining configuration
WALLET_ADDRESS = "YOUR_MONERO_WALLET_ADDRESS"
POOL_URL = "pool.supportxmr.com:3333"  # Example pool
POOL_PASSWORD = "x"

# Start mining with hardcoded configuration
@app.route('/start-mining', methods=['POST'])
def start_mining():
    global mining_process
    if mining_process is None:
        try:
            mining_command = [
                'xmrig',
                '-o', POOL_URL,
                '-u', WALLET_ADDRESS,
                '-p', POOL_PASSWORD,
                '--keepalive',
                '--cpu-priority', '5'  # Example priority
            ]
            mining_process = subprocess.Popen(mining_command)
            return "Mining started!", 200
        except Exception as e:
            return f"Error: {str(e)}", 500
    else:
        return "Mining is already running!", 400

# Stop mining
@app.route('/stop-mining', methods=['POST'])
def stop_mining():
    global mining_process
    if mining_process is not None:
        mining_process.terminate()
        mining_process = None
        return "Mining stopped!", 200
    else:
        return "Mining is not running!", 400

# Status check
@app.route('/status', methods=['GET'])
def status():
    global mining_process
    if mining_process is not None:
        return jsonify({"status": "Running"}), 200
    else:
        return jsonify({"status": "Not Running"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
