const express = require('express')

const { Register, Login } = require('../controllers/auth.controller')

const authRouter = express.Router()

authRouter.route('/register').post(Register)

authRouter.route('/login').post(Login)

module.exports = authRouter
