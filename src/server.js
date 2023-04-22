const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());
app.use(router);

mongoose
  .connect(
    `mongodb://127.0.0.1:${process.env.PORT_MONGO}/${process.env.DATABASE_NAME}`
  )
  .then(() => console.log("Connected!"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
