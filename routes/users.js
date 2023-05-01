const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt") 

let User = require('../models/user');


router.post("/register", async (req, res) => {
    const user = req.body;

    //is the username or email taken already?
    const takenUsername = await User.findOne({username: user.username})
    const takenEmail = await User.findOne({email: user.email})

    if (takenEmail || takenUsername) {
        res.json({message: "Username or Email already in use"})
    } else {
        user.password = await bcrypt.hash(req.body.password, 10)

        const savedUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })

        savedUser.save()
        res.json({message: "success"})
    }
})

router.post("/login", (req, res) => {
    const userLogin = req.body;

    User.findOne({username: userLogin.username})
        .then(savedUser => {
            if (!savedUser) {
                return res.json({
                    message: "invalid username or password"
                })
            }
            bcrypt.compare(userLogin.password, savedUser.password)
            .then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: savedUser._id,
                        username: savedUser.username,
                    }
                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {expiresIn: 86400},
                        (err, token) => {
                            if (err) return res.json({message: err})
                            return res.json({
                                message: "Success",
                                token: "Bearer " + token
                            })
                        }
                    )
                } else {
                    return res.json({
                        message: "invalid username or password"
                    })
                }
            })
        })
})

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message: "Failed To Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            next()
        })
    } else {
        res.json({message: "incorrect token given", isLoggedIn: false})
    }
}

router.get("/getUsername", verifyJWT, (req, res) => {
    res.json({isLoggedIn: true, username: req.user.username})
})

module.exports = router;