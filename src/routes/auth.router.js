const express = require('express')
const { login } = require('../controllers/auth.controller')

const authRouter = express.Router()

authRouter.route('/').post(login)

module.exports = authRouter
