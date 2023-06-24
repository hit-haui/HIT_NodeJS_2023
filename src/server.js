const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const route = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
dotenv.config();

const app = express();
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nodejs";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

app.use(route);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Example app listening on port", `${port}`);
});
