const express = require("express");

const { login } = require("../controllers/auth.controller");
const { createUser } = require("../controllers/user.controller");

const authRouter = express.Router();

authRouter.route('/login')
    .post(login)

authRouter.route('/register')
    .post(createUser)

module.exports = authRouter;
