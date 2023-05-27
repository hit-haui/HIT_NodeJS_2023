const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const blogRoute = require("./src/router/blogs.route");

const port = process.env.PORT || 3000;
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/KIEM_TRA";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(blogRoute);

dotenv.config();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
