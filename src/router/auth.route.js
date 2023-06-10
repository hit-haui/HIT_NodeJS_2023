const express = require("express");

const { Register } = require("../controller/auth.controller");

const authRoute = express.Router();

authRoute.route("/register").post(Register);

module.exports = authRoute;
