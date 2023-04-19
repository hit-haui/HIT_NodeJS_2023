const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const router = require("./routes");

const app = express();
const port = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/users' || process.env.DATABASE_URL)
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err.message))

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
