const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const router = require("./routes");
const errMiddleware = require("./middlewares/error.middleware");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connect to database successfully!!!"))
  .catch((err) => {
    console.log(err);
  });

app.use(errMiddleware);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
