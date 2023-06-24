const express = require("express");

const { Register, Login } = require("../controllers/auth.controller");
const { getUser } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roles = require("../middlewares/role.middleware");

const authRouter = express.Router();
authRouter.route("/register").post(Register);
authRouter.route("/login").post(Login);

authRouter.use(authMiddleware);
authRouter.use(roles(["admin", "user"]));
authRouter.route("/me").get(getUser);
module.exports = authRouter;
