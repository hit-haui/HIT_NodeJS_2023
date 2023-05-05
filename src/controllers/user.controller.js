const { error } = require('console')
const User = require('../models/user.model')

// get users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      users,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}

// get user by id
const getUserById = async (req, res, next) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    // Check user
    if (!user) {
      throw new Error('User not found!')
      // return res.status(404).json({
      //     message: "User not found!"
      // });
    }
    // Return result
    res.status(200).json({
      user,
    })
  } catch (error) {
    next(error)
  }
}

// create user
const createUser = async (req, res) => {
  // New user
  const newUser = req.body
  // Check if there is a required field
  if (!newUser.studentCode) {
    return res.status(400).json({
      message: 'Student code is required!',
    })
  }
  // Add new user to database
  try {
    const user = await User.create(newUser)
    res.status(201).json({
      user,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}

// update user by id
const updateUserById = async (req, res) => {
  const { userId } = req.params
  try {
    const userRaw = req.body
    // Update user
    const updatedUser = await User.findByIdAndUpdate(userId, userRaw)
    // Check user
    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found!',
      })
    }
    // Send back the updated user info to client
    res.status(200).json({
      updatedUser,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}

// delete user by id
const deleteUserById = async (req, res) => {
  const { userId } = req.params
  try {
    // Delete user
    const userDeleted = await User.findByIdAndDelete(userId)
    // Check user
    if (!userDeleted) {
      return res.status(404).json({
        message: 'User not found!',
      })
    }
    // Send back the deleted user info to client
    res.status(200).json({
      userDeleted,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
}
