const express = require('express')
const {register} = require('../controllers/Auth.controller')

const authMiddleware = express.Router()

authMiddleware
.route('/register').post(register)

module.exports = authMiddleware