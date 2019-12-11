const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    content: String,
    username: String,
    dateCreated: Date
})

module.exports = mongoose.model('Notes', notesSchema);