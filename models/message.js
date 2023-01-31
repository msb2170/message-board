const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

//message schema
const messageSchema = new Schema({
    id: {type: ObjectId},
    author: String,
    title: String,
    messageText: String,
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Message', messageSchema)