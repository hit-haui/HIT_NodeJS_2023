const express = require("express");
const { Register,Login } = require("../controller/auth.controller");
const authRouter = express.Router();
const authMiddleware = require("../controller/auth.controller")
authRouter.route("/register").post(Register);
authRouter.route("/login").post(Login);
module.exports = authRouter;