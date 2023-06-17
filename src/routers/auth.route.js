const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const authMiddleware = express.Router();

authMiddleware.route("/register").post(register);
authMiddleware.route("/login").post(login);
module.exports = authMiddleware;
