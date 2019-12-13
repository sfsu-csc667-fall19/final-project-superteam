const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const cookierParser = require('cookie-parser');
const { MongoClient, ObjectID } = require('mongodb');

const client = redis.createClient();

const port = 3002;
const app = express();
app.use(bodyParser.json());
app.use(cookierParser());

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

mongoClient.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Successfully connected to server!');
});

const db = mongoClient.db('project');

app.post('/messenger/postMessage', (req, res) => {
    console.log(req.body);
    const message = {
        group: ObjectID.createFromHexString(req.body.group),
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
    db.collection('users')
        .findOne({
            _id: ObjectID.createFromHexString(req.cookies.id),
        })
        .then((docs) => {
            var i;
            var j;
            var length = docs.groups.length;

            let groups = [];
            let messages = [];
            let members = [];

            const lastGroup = docs.groups[docs.groups.length-1];

            for (i = 0; i < length; i++) {
                let current = docs.groups[i];
                                
                db.collection('users')
                    .find({
                        groups: current,
                    })
                    .toArray()
                    .then((docs) => {
                        console.log(docs);
                        groups.push({
                            group: current,
                            members: docs,
                        });
                    })
                    .catch(console.log);
                
                db.collection('groups')
                    .findOne({
                        _id: current,
                    })
                    .then((docs) => {

                        for (j = 0; j < docs.messages.length; j++) {
                            messages.push(docs.messages[j]);
                        }
                        const same = new ObjectID(lastGroup).equals(new ObjectID(docs.messages[0].group))
                        if (j === docs.messages.length && i === length && same) {
                            const body = {
                                groups,
                                messages,
                                members,
                            }
                            res.send(body);
                        }
                    })
                    .catch(console.log);
            }
        })
        .catch(console.log);
});

app.listen(port, () => console.log(`Messenger on port ${port}!`))