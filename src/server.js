const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
<<<<<<< HEAD
// const errorMiddeware = require("./middlewares/error.middleware");
=======
const errorMiddeware = require("./middlewares/error.middleware");

>>>>>>> 7aa7af93ba5e8567893c085b8ddce119c25aec3a
const app = express();

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
<<<<<<< HEAD
// app.use(errorMiddeware);
=======

app.use(errorMiddeware);

>>>>>>> 7aa7af93ba5e8567893c085b8ddce119c25aec3a
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
