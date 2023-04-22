const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 8080;
app.use(express.json());

app.use(router);
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port.env.PORT}`);
});
