const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');

const app = express();
const port = 4000;

const appServer = server.createServer(app);
const apiProxy = httpProxy.createProxyServer(app);
const wsProxy = httpProxy.createProxyServer({
    target: 'http://172.28.0.1:3003',
    ws: true,
});

apiProxy.on('error', (err, req, res) => {
    console.log(err);
    res.status(500).send('Proxy Error');
});

wsProxy.on('error', (err, req, socket) => {
    console.log(err);
    console.log('ws failed');
    socket.end();
});

app.all('/websocket/*', (req, res) => {
    console.log('incoming ws');
    apiProxy.web(req, res, {
        target: 'http://172.28.0.1:3003/websocket',
    });
});


app.all('/messenger/*', (req, res) => {
    console.log(req.path);
    apiProxy.web(req, res, {
        // target: 'http://localhost:3002',
        target: 'http://172.28.0.1:3002',
    });
});

app.all('/users/*', (req, res) => {
    console.log(req.path);
    apiProxy.web(req, res, {
        // target: 'http://localhost:3001',
        target: 'http://172.28.0.1:3001',
    });
});

app.all('*', (req, res) => {
    console.log(req.path);
    apiProxy.web(req, res, {
        // target: 'http://localhost:3000',
        target: 'http://172.28.0.1:3000',
    });
});

appServer.on('upgrade', (req, socket, head) => {
    console.log('upgrade ws here');
    wsProxy.ws(req, socket, head);
});

appServer.listen(port, () => console.log(`Gateway on port ${port}!`))