const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    topic: String,
    username: String,
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
})

module.exports = mongoose.model('Topic', topicSchema);