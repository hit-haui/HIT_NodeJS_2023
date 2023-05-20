const User = require('../models/user.model')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const Register = async (req, res, next) => {
  try {
    const { fullName, studentCode, password } = req.body
    if (!studentCode) {
      const err = new Error('Student code is required!')
      err.status = 400
      throw err
    }
    const checkUser = await User.findOne({ studentCode })
    if (checkUser) {
      const err = new Error('Student is exist')
      err.status = 400
      throw err
    }
    const newUser = User.create({ fullName, studentCode, password })
    res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
}

const Login = async (req, res, next) => {
  try {
    const { studentCode, password } = req.body
    const user = await User.findOne({ studentCode })
    if (!user) {
      const err = new Error('Student code or password is incorrect')
      err.status(401)
      throw err
    }
    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) {
      const err = new Error('Password is incorrect')
      err.status(401)
      throw err
    }
    const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY)
    res.status(200).json({
      message: 'Login successfully',
      token,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  Register,
  Login,
}
