const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
// const port = 8080;

app.use(express.json());
app.use(router);

dotenv.config();
const port = process.env.PORT || 8080;
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/hit_nodejs";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
