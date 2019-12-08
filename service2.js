const axios = require('axios');
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
app.use(express.json());

const port = 3002;

const url = 'mongodb://localhost:27017';
const dbName = 'project';
const mongo = new MongoClient(url, { useUnifiedTopology: true });

mongo.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("Connected successfully to server!");
});

const db = mongo.db(dbName);

app.post('/service2/create', (req, res) => {
    db.collection('groups')
        .insertOne({
            messages: [],
        })
        .then((docs) => {
            console.log(docs.insertedId);
            const updater = {
                $push: {
                    groups: docs.insertedId,
                }
            }

            db.collection('users')
                .findOneAndUpdate({
                    _id: ObjectID.createFromHexString(req.body.me),
                }, updater)
                .then(() => {

                })
                .catch(console.log);

            db.collection('users')
                .findOneAndUpdate({
                    _id: ObjectID.createFromHexString(req.body.you),
                }, updater)
                .then(() => {

                })
                .catch(console.log);
        })
        .catch((e) => {
            console.log(e);
        });
});

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });

const redis = require('redis');
const client = redis.createClient();

const messages = [];

const buildMessages = (groups) => {
    for (var i=0; i<groups.length; i++) {
        db.collection('groups')
            .findOne({
                _id: ObjectID.createFromHexString(groups[i]),
            })
            .then((response) => {
                for (var j=0; j<response.messages.length; j++) {
                    messages.push(response.messages[j]);
                }
                if (i === groups.length) {
                    broadcastAllMessages();
                }
            })
            .catch(console.log);
    }    
}

const broadcastMessage = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};

const broadcastAllMessages = (newMessage) => {
    messages.unshift(newMessage);
    broadcastMessage({
        type: 'UPDATE_MESSAGES',
        messages,
    });
};

wss.on('connection', (ws) => {
    client.get(0, (err, cachedValue) => {
        ws.id = JSON.parse(cachedValue)._id;
        buildMessages(JSON.parse(cachedValue).groups);
    })

    console.log('Someone has connected');
    ws.on('message', (message) => {
        const messageObject = JSON.parse(message);
        switch (messageObject.type) {
            case 'SEND_MESSAGE':
                broadcastAllMessages(messageObject.newMessage);
                break;
        }
        console.log(message);
    });

    ws.on('close', () => {
        console.log('someone has disconnected!');
    });

    ws.on('error', (e) => {
        console.log(e);
    });
});


app.listen(port, () => console.log(`Service 2 on port ${port}!`))