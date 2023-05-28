const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("Error!", err));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(console.log(`Example app listening on port ${port}`));
