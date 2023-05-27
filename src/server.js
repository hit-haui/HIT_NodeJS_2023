const express = require('express');
const router = require("./routes/index.route");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/hit-nodejs";

mongoose
    .connect(mongoURI)
    .then(() => console.log("Connect database successfully!"))
    .catch((err) => console.log(err));

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});