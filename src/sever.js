const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const errorMiddleware = require("./middleware/error.middleware");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use(router);

dotenv.config();

const port = process.env.PORT || 8080;
app.use("/uploads", express.static("uploads"));
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
