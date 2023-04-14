const path = require('path');
const express = require('express');
const router = require('./routes/user.route');

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})