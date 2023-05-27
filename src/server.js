const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const router = require("./routers");
const port = 8000;
app.use(express.json());
// app.use(router);
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/hit_nodejs";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

