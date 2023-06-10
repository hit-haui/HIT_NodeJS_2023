const express = require("express");
const { Register } = require("../controller/auth.controller");
const authRouter = express.Router();

authRouter.route("/register").post(Register);
module.exports = authRouter;