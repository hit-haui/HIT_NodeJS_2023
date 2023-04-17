const Users = require('../models/user.model')

const getUsers = (req, res) => {
  const users = Users.find()
  return res.json(users)
}

const getUserById = (req, res) => {
  const { userId } = req.params
  const user = Users.getUserById(userId)
  return res.json(user)
}

const createUser = (req, res) => {
  const data = req.body
  const newUser = Users.createUser(data)
  return res.json(newUser)
}

const updateUserById = (req, res) => {
  const data = req.body
  const { userId } = req.params
  const users = Users.updateUserById(userId, data)
  return res.json(users)
}

const deleteUserById = (req, res) => {
  const { userId } = req.params
  const users = Users.deleteUserById(userId)
  res.json(users)
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
}
