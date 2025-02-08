const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5002/ws');

ws.on('open', () => {
    console.log('Connected to Go WebSocket server');
});

ws.on('message', (message) => {
    console.log('Received from Go server:', message);
});

function sendMessageToGoServer(message) {
    ws.send(message);
}
