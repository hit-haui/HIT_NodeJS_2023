const express = require("express");

const { Register, Login } = require("../controller/auth.controller");

const authRoute = express.Router();

authRoute.route("/register").post(Register);
authRoute.route("/login").post(Login);

module.exports = authRoute;
