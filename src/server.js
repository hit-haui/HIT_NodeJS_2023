const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;
const mongoURI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/blog-default';

mongoose
  .connect(mongoURI)
  .then(() => console.log('Connect database successfully!'))
  .catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('HIT NodeJS 2023!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
