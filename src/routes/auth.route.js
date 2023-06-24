const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');

const { getUser } = require('../controllers/user.controller');

const { register, login } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.route('/register').post(register);

authRouter.route('/login').post(login);

authRouter.route('/me').get(authMiddleware, getUser);

module.exports = authRouter;
