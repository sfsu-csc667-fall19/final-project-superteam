const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notes'
        }
    ] 
});

module.exports = mongoose.model('User', userSchema);