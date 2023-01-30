const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//message schema
const messageSchema = new Schema({
    author: String,
    title: String,
    messageText: String,
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Message', messageSchema)