const WebSocket = require('ws');
const redis = require('redis');

const client = redis.createClient();

const wss = new WebSocket.Server({ port: 3003 });

wss.on('connection', (ws) => {
    console.log('Someone has connected');
});

client.on('message', (channel, message) => {
    console.log(`Subscriber hears message ${message}`);
    console.log(channel);
    const send = JSON.stringify({
        message,
        channel,
    });

    wss.clients.forEach((client) => {
        client.send(send);
    });
});

client.subscribe('messages');