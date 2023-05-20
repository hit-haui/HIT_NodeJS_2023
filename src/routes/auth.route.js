const express = require("express");
const { login, register } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.route("/login").post(login);
authRouter.route("/register").post(register);

module.exports = authRouter;
