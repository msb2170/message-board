const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


//configure Express
const app = express();

app.use(cors());
app.use(express.json())
app.use(require('./routes/message'))

//MongoDB connection
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI, {useNewURLParser: true})
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log(err))

//Server Connection
PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server is running on port ${PORT}`)
})
