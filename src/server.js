const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Example app listening on port", `${port}`);
});
