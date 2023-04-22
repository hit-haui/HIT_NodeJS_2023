const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(router);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hit-nodejs')
  .then(() => console.log("Connect DB Successfully"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
