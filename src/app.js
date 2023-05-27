const express = require("express");
const router = require("./routers/blog.route");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const app = express();

app.use(express.json());
app.use(router);

dotenv.config();
const port = process.env.PORT || 3000;
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/KtraNodeJs";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});