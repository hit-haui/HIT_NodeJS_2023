const express = require('express');
const webRouter = express.Router();

webRouter.route('/')
    .get((req, res) => {
        res.send('<h1 style="color: blue">Welcome to my website!</h1>');
    });

module.exports = webRouter;