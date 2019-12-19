const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const cookierParser = require('cookie-parser');
const { MongoClient, ObjectID } = require('mongodb');

// const client = redis.createClient(6379, 'redis');
// const client = redis.createClient({host: process.env.REDIS_HOST || 'localhost'});
// const client = redis.createClient();
const client = redis.createClient({host: process.env.REDIS_HOST});


const port = 3002;
const app = express();
app.use(bodyParser.json());
app.use(cookierParser());

// const url = process.env.MONGO_HOST;

const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
// const url = 'mongodb://localhost:27017';

const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

mongoClient.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(process.env.MONGO_HOST);
    console.log('Successfully connected to server!');
});

const db = mongoClient.db('project');

app.post('/messenger/postMessage', (req, res) => {
    console.log(req.body);
    const message = {
        group: ObjectID.createFromHexString(req.body.group),
        // group: req.body.group,
        author: req.cookies.firstName + ' ' + req.cookies.lastName,
        message: req.body.message,
    }
    const updater = {
        $push: {
            messages: message,
        }
    }
    db.collection('groups')
        .findOneAndUpdate({
            _id: ObjectID.createFromHexString(req.body.group),
        }, updater)
        .then((docs) => {
            res.send(docs);
        })
        .catch(console.log);
    client.publish('messages', JSON.stringify(message));
});

app.get('/messenger/getMessages', (req, res) => {
    db.collection('groups')
        .distinct('messages')
        .then((docs) => {
            res.send(docs);
        })
        .catch(console.log);
});

app.post('/messenger/postGroup', (req, res) => {
    db.collection('groups')
        .insertOne({
            members: [req.body.you, req.body.them],
            messages: [],
        })
        .then((docs) => {
            client.publish('groups', JSON.stringify(docs.ops[0]));
            res.send(docs.ops[0]);
        })
        .catch(console.log);
});

app.get('/messenger/getGroups', (req, res) => {
    db.collection('groups')
        .find()
        .toArray()
        .then((docs) => {
            res.send(docs);
        })
        .catch(console.log);
});


app.listen(port, () => console.log(`Messenger on port ${port}!`))