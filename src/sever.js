const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
const dotenv = require("dotenv");

app.use(express.json());
app.use(router);

dotenv.config();

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
