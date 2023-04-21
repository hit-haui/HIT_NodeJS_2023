const express = require("express");
const app = express();
const port = 8080;
const router = require("./routes/index");
const userRouter = require("./routes/user.route");
const mongoose = require('mongoose');

mongoose
  .connect("mongodb://127.0.0.1:27017/hit_nodejs")
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
