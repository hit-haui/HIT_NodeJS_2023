const express = require('express');
const router = require("./routes/user.route");
const mongoose = require('mongoose');

const app = express();
const port = 8080;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(router);

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/user_HIT');
    console.log("connect successful");
  } catch (error) {
    console.log("connect fail");
  }
})()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
