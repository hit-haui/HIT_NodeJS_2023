const express = require("express");
const authRouter = express.Router();
const { Register } = require("../controllers/auth.controller");

authRouter.route("/register").post(Register);

module.exports = authRouter;
