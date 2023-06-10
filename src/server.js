const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers");
const errorMiddleware = require("./middlewares/error.middleware");
const dotenv = require("dotenv");
const app = express();

app.use(express.json());
app.use(router);
app.use("/uploads", express.static("uploads"));
dotenv.config();
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/hit_nodejs";
const port = 3000;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
