const fs = require('fs')

const path = require('path')

const Users = require('../models/user.model')

const getUsers = (req, res) => {
  const users = Users.find()
  console.log(users)
  return res.json(users)
}

const getUserById = (req, res) => {
  const users = Users.find()
  const { userId } = req.params
  const user = Users.getById(userId)
  if (!user) {
    return res.json({ mgs: 'Not found' })
  }
  res.json(user)
}

const createUser = (req, res) => {
  const data = req.body
  const newUser = new Users(data)
  newUser.save()
  return res.json(newUser)
}

const updateUserById = (req, res) => {
  const users = Users.find()
  const { userId } = req.params
  const index = Users.getIdIndex(userId)
  if (index == -1) {
    return res.json({ mgs: 'Not found user' })
  }
  const data = req.body
  const newUser = new Users(data)
  users.splice(index, 1, newUser)
  fs.writeFile(
    path.join(__dirname, '../data/users.json'),
    JSON.stringify(users),
    (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Success')
        res.json(users)
      }
    }
  )
}

const deleteUserById = (req, res) => {
  const users = Users.find()
  const { userId } = req.params
  const index = Users.getIdIndex(userId)
  if (index == -1) {
    return res.json({ mgs: 'Not found to delete' })
  }
  users.splice(index, 1)
  fs.writeFile(
    path.join(__dirname, '../data/users.json'),
    JSON.stringify(users),
    (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Success')
        res.json(users)
      }
    }
  )
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
}
