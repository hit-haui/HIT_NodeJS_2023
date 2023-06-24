const express = require('express');
const router = require("./routes/index.route");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/error.middleware");

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/hit_nodejs";

mongoose
    .connect(mongoURI)
    .then(() => console.log("Connect database successfully!"))
    .catch((err) => console.log(err));

app.use('/api/v1', router);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});