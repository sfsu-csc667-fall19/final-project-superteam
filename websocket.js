const WebSocket = require('ws');
const redis = require('redis');

// const client = redis.createClient(6379, 'redis');
// const client = redis.createClient();
const client = redis.createClient({host: process.env.REDIS_HOST || 'localhost'});
// const client = redis.createClient({host: process.env.REDIS_HOST});



const wss = new WebSocket.Server({ port: 3003 });

wss.on('connection', (ws) => {
    console.log('Someone has connected');
});

client.on('message', (channel, message) => {
    console.log(`Subscriber hears message ${message} on channel ${channel}`);
    const data = JSON.stringify({
        message,
        channel,
    });

    wss.clients.forEach((client) => {
        client.send(data);
    });
});

client.subscribe('messages');
client.subscribe('groups');