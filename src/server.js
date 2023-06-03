const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routers");

const app = express();

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(router);

dotenv.config();

const port = process.env.PORT || 3000;
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/BlogDefault";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
