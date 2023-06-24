const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { register, login } = require("../controllers/auth.controller");
const { getUser } = require("../controllers/user.controller");
const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/me").get(authMiddleware, getUser);
authRouter.route("/login").post(login);

module.exports = authRouter;
