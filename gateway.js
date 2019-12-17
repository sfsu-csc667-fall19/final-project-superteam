const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const port = 80;

const apiProxy = httpProxy.createProxyServer(app);


apiProxy.on('error', (err, req, res) => {
    console.log(err);
    res.status(500).send('Proxy Error');
});

app.all('/messenger/*', (req, res) => {
    console.log(req.path);
    apiProxy.web(req, res, {
        target: 'http://172.28.0.1:3002',
    });
});

app.all('/users/*', (req, res) => {
    console.log(req.path);
    apiProxy.web(req, res, {
        target: 'http://172.28.0.1:3001',
    });
});

app.all('*', (req, res) => {
    console.log(req.path);
    apiProxy.web(req, res, {
        target: 'http://172.28.0.1:3000',
    });
});

app.listen(port, () => console.log(`Gateway on port ${port}!`))