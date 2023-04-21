const userModel = require('../models/user.model')

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    return res.status(200).json(users)
  } catch (err) {
    console.log(err)
  }
}

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params
    if (!userId) {
      console.log('Not found user!')
    } else {
      const user = await userModel.findById(userId)
      return res.status(200).json(user)
    }
  } catch (err) {
    console.log(err)
  }
}

const createUser = async (req, res) => {
  try {
    const data = req.body
    if (!data) {
      console.log('Not found')
    } else {
      const user = await userModel.create(data)
      return res.json(user)
    }
  } catch (err) {
    console.log(err)
  }
}

const updateUserById = async (req, res) => {
  try {
    const newUser = req.body
    if (!newUser) {
      console.log('New user is required!')
    } else {
      const { userId } = req.params
      if (!userId) {
        console.log('Not found user!')
      } else {
        const user = await userModel.findByIdAndUpdate(userId, newUser)
        return res.json({
          message: 'Updating succeed',
        })
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params
    if (!userId) {
      console.log('Not found user!')
    } else {
      const user = await userModel.findByIdAndDelete(userId)
      return res.json({
        message: 'deleting succeed',
      })
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
}
