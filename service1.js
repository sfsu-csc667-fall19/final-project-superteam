const express = require('express');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const { MongoClient, ObjectID } = require('mongodb');

const redisClient = redis.createClient();

const app = express();
app.use(cookieParser());
app.use(express.json());
const port = 3001;

app.get('/service1/verify', (req, res, next) => {
    if (!req.cookies.username || !req.cookies.password) {
        res.status(403);
        return res.send('You need access to this endpoint!');
    }

    const body = {
        username: req.cookies.username,
        password: req.cookies.password,
    };
    const key = req.cookies.username + '_' + req.cookies.password;

    redisClient.get( key, (err, cachedValue) => {
        if (cachedValue !== null ) {
            console.log('Cache hit');
            if (cachedValue === 'true') {
                return next();
            }
            else {
                res.status(403);
                return res.send('You need access to this endpoint (service1/verify redisClient.get');
            }
        }
        else {
            console.log('Cache missed');

            axios.post('http://localhost:3001/service1/login', body)
            .then( (res) => {
                if (res.data.valid) {
                    redisClient.set(key, true);
                    return next();
                }
                else {
                    redisClient.set(key, false);
                    res.status(403);
                    return res.send('You need access to this endpoint (service1 redis client cache miss -- !res.data.valid');
                }
            })
            .catch((e) => {
                console.log(e);
            });
        }
    });
});

app.get('service1/verify', (req, res) => {
    res.send({
        username: req.cookies.username,
    });
});


const url = 'mongodb://localhost:27017';
const dbName = 'test101';
const mongo = new MongoClient(url, {useUnifiedTopology: true});

mongo.connect( (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Connected to mongo server!');
});

const db = mongo.db(dbName);

app.post('/service1/login', (req, res) => {
    let valid = false;

    db.collection('users')
    .findOne({
        username: req.body.username,
        password: req.body.password,
    })
    .then( (docs) => {
        if (docs) {
            valid = true;
        }
        res.send({
            valid,
        });
    })
    .catch( (e) => {
        console.log(e);
    });
});

app.post('/service1/register', (req, res) => {
    db.collection('users')
    .insertOne({
        username: req.body.username,
        password: req.body.password,
    })
    .then( (docs) => {
        res.send('Account created in mongo!');
    })
    .catch((e) => {
        console.log(e);
    });
});

app.listen(port, () => console.log(`superteam app listening on port ${port}!`));