const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const router = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connect to database successfully!!!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
