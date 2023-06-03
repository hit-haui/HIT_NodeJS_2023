const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routers");
const errorMiddleware = require("./middleware/error.middleware");
const app = express();

dotenv.config();
app.use(express.json());
app.use(routes);
const port = process.env.PORT || 3000;
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/Test";
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
