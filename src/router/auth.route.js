const express = require("express");

const { Register, Login } = require("../controller/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

const role = require("../middleware/role.middleware");

const { getUser } = require("../controller/user.controller");

const authRoute = express.Router();

authRoute.route("/register").post(Register);
authRoute.route("/login").post(Login);
authRoute.route("/me").get(authMiddleware, role(["admin", "author"]), getUser);

module.exports = authRoute;
