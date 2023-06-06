const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const port = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nodejs";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Example app listening on port", `${port}`);
});
