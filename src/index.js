const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const mongoURI = process.env.URI_DB;

mongoose
    .connect(mongoURI)
    .then(() => console.log("Connect database successfully!"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
