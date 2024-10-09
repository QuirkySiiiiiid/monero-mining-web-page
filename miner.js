// miner.js
document.getElementById('startMining').addEventListener('click', startMining);
document.getElementById('stopMining').addEventListener('click', stopMining);

function startMining() {
    document.getElementById('status').innerText = 'Status: Mining...';

    fetch('/start-mining', {
        method: 'POST'
    }).then(response => response.json())
      .then(data => {
          console.log('Mining started', data);
      }).catch(error => console.error('Error starting mining:', error));
}

function stopMining() {
    document.getElementById('status').innerText = 'Status: Stopped';

    fetch('/stop-mining', {
        method: 'POST'
    }).then(response => response.json())
      .then(data => {
          console.log('Mining stopped', data);
      }).catch(error => console.error('Error stopping mining:', error));
}
