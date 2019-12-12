const express = require('express');
const mongoose = require('mongoose');
const chatRoom = require('./models/chatRoom');
const socket = require('socket.io');
const app = express();

const mongoURI = 'mongodb://localhost:27017/chatDB';
mongoose.connect( mongoURI, {userNewUrlParser: true});


const port = process.env.PORT || 3003;

const server = app.listen(port, () => {
    console.log('listening for request on port 3003');
});

const io = socket(server);

io.on('connect', (socket) => {

    socket.on('join', ({username, currentTopic }, callback) => {
        const newChat = {
            id: socket.id,
            topic: currentTopic,
            username: username,
        }

        chatRoom.create(newChat)
         .then(chat => {
             chat.save();
         })
         .catch(err => {
             return callback(err);
         })

         socket.join(currentTopic);

        socket.emit('message', {username: username, text: `Welcome to ${currentTopic} discussion.`});
        socket.broadcast.to(currentTopic).emit('message', {username : 'admin', text: `${username} has joined!`});

        callback();
    });

    socket.on('sendMessage', (data, callback) => {
        chatRoom.findOne({
            id: socket.id
          })
            .then(chat => {
                io.to(chat.topic).emit('message', {username: chat.username, text: data.message});
            }).catch(err => {
                callback();
            })
    })

    socket.on('disconnect', (username, currentTopic) => {
        if(username && currentTopic) {
            io.to(username).emit('message', {username: 'Admin', text: `${username} has left`});
        }
    })
})


