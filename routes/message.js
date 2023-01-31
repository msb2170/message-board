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

//Get a single post
router.get('/message/:id', (req, res) => {
    const {id} = req.params
    
    Message.findById(id).exec((err, post) => {
        if (err) {
            return res.status(500).json({err})
        }
        res.json(post)
    })
})

//Post a message
router.post('/message', (req, res) => {
    let message = new Message({
        author: req.body.author,
        title: req.body.title,
        messageText: req.body.messageText,
        date: req.body.date
    })
    message.save((err, db) => {
        if (err) {
            return res.status(500).json({err})
        }
        res.json({db})
    })
})

//Update a message

//Delete a message

module.exports = router;
