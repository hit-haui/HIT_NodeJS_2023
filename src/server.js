const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;
const mongoURI = process.env.DB_URI || "mongodb://127.0.0.1:27017/hit-nodejs";

(async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connect database successfully!")
    } catch (error) {
        console.log(error);
    }
})();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
