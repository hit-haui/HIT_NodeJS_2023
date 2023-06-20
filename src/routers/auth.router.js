const express = require("express");

const { register, login } = require("../controllers/auth.controller");
const { getUser } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middlleware");

const authRouter = express.Router();

authRouter.route('/register')
    .post(register)

authRouter.route('/login')
    .post(login)

authRouter.route('/me')
    .get(authMiddleware, roleMiddleware(['user', 'admin']), getUser)

module.exports = authRouter;
