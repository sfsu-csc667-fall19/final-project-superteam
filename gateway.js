const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const port = 80;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
    console.log(err);
    res.status(500).send('Proxy Error');
});

app.all('/service1/*', (req, res) => {
    console.log(req.path);
    apiProxy.web(req, res, {
        target: 'http://localhost:3001',
    });
});

app.all('/service2/*', (req, res) => {
    console.log(req.path);
    apiProxy.web(req, res, {
        target: 'http://localhost:3002',
    });
});

app.all('*', (req, res) => {
    console.log(req.path);
    apiProxy.web(req, res, {
        target: 'http://localhost:3000',
    });
});

app.listen(port, () => console.log(`Gateway on port ${port}!`))