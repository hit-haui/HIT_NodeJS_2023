const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if (!authorization) {
      const err = new Error('Unauthorized!')
      err.status = 401
      throw err
    }
    const token = authorization.split(' ')[1]

    const payload = jwt.verify(token, process.env.PRIVATE_KEY)

    const userId = payload.userId

    const user = await User.findById(userId)
    if (!user || user.role !== 'admin') {
      const err = new Error('Unauthorized')
      err.status = 401
      throw err
    }
    next()
  } catch (err) {
    err.status = 401
    next(err)
  }
}

module.exports = authMiddleware
