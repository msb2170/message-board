const express = require('express');
const router = express.Router();

//Pass in the user model
let Message = require('../models/message')

//Get a list of all messages
router.get('/message', (req, res) => {
    Message.find({}).sort({date: -1}).exec((err, db) => {
        if (err) {
            return res.status(500).json({err})
        }
        if (!db) {
            return res.status(404).json({
                message: "Couldn't find any messages"
            })
        }
        res.json({db})
    })
})

//Post a message
router.post('/message', (req, res) => {
    let message = new Message({
        title: req.query.title,
        messageText: req.query.messageText,
        date: req.query.date
    })
    message.save((err, db) => {
        if (err) {
            return res.status(500).json({err})
        }
        res.json({db})
    })
})

module.exports = router;