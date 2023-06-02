const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routers");
app.use(express.json());
app.use(router);
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/hit_nodejs";
const port = 8000;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

