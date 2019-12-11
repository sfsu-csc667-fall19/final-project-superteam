const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    id: String,
    topic: String,
    username: String,
})

module.exports = mongoose.model('chatRoom', chatRoomSchema);