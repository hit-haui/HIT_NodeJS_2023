const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routers');

const errorMiddeware = require('./middlewares/error.middleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const mongoURI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/blog-default';

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(router);

mongoose
  .connect(mongoURI)
  .then(() => console.log('Connect database successfully!'))
  .catch((err) => {
    console.log(err);
});

app.use(errorMiddeware);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
