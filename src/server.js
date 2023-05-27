const express = require('express');
const router = require("./routes/index.route");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});