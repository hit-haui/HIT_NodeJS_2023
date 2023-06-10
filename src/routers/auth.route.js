const express = require("express");
const { Register,Login } = require("../controller/auth.controller");
const authRouter = express.Router();

authRouter.route("/register").post(Register);
authRouter.route("/login").post(Login);
module.exports = authRouter;