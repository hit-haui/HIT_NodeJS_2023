const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(router);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connect DB Successfully"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
