const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const router = require("./routes");

const app = express();
const port = process.env.PORT || 8080;
const mongodbURI = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/users';

mongoose.connect(mongodbURI)
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err.message))

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
