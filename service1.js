const express = require('express');
const redis = require('redis');
const axios = require('axios');
const cookierParser = require('cookie-parser');
const { MongoClient } = require('mongodb');

const client = redis.createClient();

const app = express();
const port = 3001;
app.use(express.json());
app.use(cookierParser());

const url = 'mongodb://localhost:27017';
const mongo = new MongoClient(url, { useUnifiedTopology: true });

mongo.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Successfully connected to server!');
});

const db = mongo.db('project');

app.post('/service1/register', (req, res) => {
    db.collection('users')
        .insertOne({
            firstName: req.body.firstName,
            surname: req.body.surname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            groups: [],
        })
        .then((docs) => {
            console.log('Account', req.body.username, 'created!');
            res.send('Account created!');
        })
        .catch((e) => {
            console.log(e);
        });
});

app.post('/service1/login', (req, res) => {
    db.collection('users')
        .findOne({
            username: req.body.username,
            password: req.body.password,
        })
        .then((docs) => {
            if (docs) {
                client.set(req.body.username + '_' + req.body.password, true);
                client.set(0, JSON.stringify(docs));
            }
            console.log(docs);
            res.send(docs);
        })
        .catch((e) => {
            console.log(e);
        });
});

app.post('/service1/logout', (req, res) => {
    const key = req.cookies.username + '_' + req.cookies.password;

    client.set(key, false);

    return res.send('Logged out!');
});

app.get('/service1/verify', (req, res, next) => {
    if (!req.cookies.username || !req.cookies.password) {
        res.status(403);
        return res.send('Access denied!');
    }
    const body = {
        username: req.cookies.username,
        password: req.cookies.password,
    };
    const key = req.cookies.username + '_' + req.cookies.password;

    client.get(key, (err, cachedValue) => {
        if (cachedValue === null) {
            axios.post('http://localhost:3001/service1/login', body)
                .then((res) => {
                    if (res.data) {
                        client.set(key, true);
                        return next();
                    } else {
                        client.set(key, false);
                        res.status(403);
                        return res.send('Access denied!');
                    }
                })
                .catch(console.log);
        } else {
            if (cachedValue === 'true') {
                return next();
            } else {
                res.status(403);
                return res.send('Access denied!');
            }
        }
    });
});

app.get('/service1/verify', (req, res) => {
    client.get(0, (err, cachedValue) => {
        res.send(cachedValue);
    })
});

app.get('/service1/search', (req, res) => {
    db.collection('users')
        .find()
        .toArray()
        .then((docs) => {
            res.send(docs);
        })
        .catch((e) => {
            res.send('Error');
        });
});

app.listen(port, () => console.log(`Service 1 on port ${port}!`))