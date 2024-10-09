from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

# Variable to store mining process
mining_process = None

@app.route('/start-mining', methods=['POST'])
def start_mining():
    global mining_process
    if mining_process is None:
        try:
            mining_process = subprocess.Popen(['xmrig', '-c', 'config.json'])
            return "Mining started!", 200
        except Exception as e:
            return f"Error: {str(e)}", 500
    else:
        return "Mining is already running!", 400

@app.route('/stop-mining', methods=['POST'])
def stop_mining():
    global mining_process
    if mining_process is not None:
        mining_process.terminate()
        mining_process = None
        return "Mining stopped!", 200
    else:
        return "Mining is not running!", 400

@app.route('/status', methods=['GET'])
def status():
    global mining_process
    if mining_process is not None:
        return jsonify({"status": "Running"}), 200
    else:
        return jsonify({"status": "Not Running"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
