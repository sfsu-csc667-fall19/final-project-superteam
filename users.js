const express = require('express');
const redis = require('redis');
const cookierParser = require('cookie-parser');
const { MongoClient } = require('mongodb');

// const client = redis.createClient(6379, 'redis');
// const client = redis.createClient();
const client = redis.createClient({host: process.env.REDIS_HOST || 'localhost'});
// const client = redis.createClient({host: process.env.REDIS_HOST});


const app = express();
const port = 3001;
app.use(express.json());
app.use(cookierParser());

// const url = 'mongodb://mongo:27017';
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
// const url = process.env.MONGO_HOST;

const mongo = new MongoClient(url, { useUnifiedTopology: true });

mongo.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Successfully connected to server!');
});

const db = mongo.db('project');

app.post('/users/register', (req, res) => {
    db.collection('users')
        .insertOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        })
        .then((docs) => {
            console.log('Account', docs.insertedId, 'created!');
            res.send('Account created!');
        })
        .catch(console.log);
});

app.post('/users/login', (req, res) => {
    db.collection('users')
        .findOne({
            username: req.body.username,
            password: req.body.password,
        })
        .then((docs) => {
            if (docs) {
                client.set(req.body.username + '_' + req.body.password, true);
            }
            res.send(docs);
            console.log(docs);
        })
        .catch(console.log);
});

app.post('/users/logout', (req, res) => {
    client.set(req.cookies.username + '_' + req.cookies.password, false);

    return res.send('Logged out!');
});

app.get('/users/verify', (req, res, next) => {
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
            axios.post('http://localhost:3001/users/login', body)
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

app.get('/users/verify', (req, res) => {
    res.send('Verified!');
});

app.get('/users/getUsers', (req, res) => {
    db.collection('users')
        .find()
        .toArray()
        .then((docs) => {
            res.send(docs);
        })
        .catch(console.log);
});

app.listen(port, () => console.log(`Users on port ${port}!`));