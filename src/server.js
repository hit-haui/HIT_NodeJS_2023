const express = require("express");
const router = require("./routes/index");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const userRoter = require("./routes/user.route");
app.use(express.json());
app.use(router);
app.use(userRoter);
mongoose
  .connect("mongodb://127.0.0.1:27017/hit_nodejs")
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
