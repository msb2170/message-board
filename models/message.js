const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

//defines a message schema that MongoDB can use
const messageSchema = new Schema({
    id: {type: ObjectId},
    author: String,
    title: String,
    messageText: String,
    date: {
        type: Date,
        default: new Date().getTime(),
    }
})

module.exports = mongoose.model('Message', messageSchema)