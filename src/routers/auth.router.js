const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const {
    register,
    login
} = require('../controllers/auth.controller');

const { getUserById } = require('../controllers/user.controller');

const authRouter = express.Router();

authRouter
    .route('/register')
    .post(register);

authRouter
    .route('/login')
    .post(login);

authRouter
    .route('/me')
    .get(authMiddleware, getUserById);

module.exports = authRouter;
