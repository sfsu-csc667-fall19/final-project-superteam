const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: String,
    dateCreated: Date
})

module.exports = mongoose.model('Message', messageSchema);