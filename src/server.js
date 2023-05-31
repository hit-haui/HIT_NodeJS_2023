const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('HIT NodeJS 2023!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
