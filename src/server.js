const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 8080;
const urlDB = process.env.MONGO_URL;

mongoose
  .connect(urlDB)
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
