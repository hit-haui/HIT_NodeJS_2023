const express = require("express");
const authRouter = express.Router();
const { Register, Login } = require("../controllers/auth.controller");

authRouter.route("/register").post(Register);
authRouter.route("/login").post(Login);
module.exports = authRouter;
