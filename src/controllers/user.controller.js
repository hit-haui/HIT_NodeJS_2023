const userModel = require('../models/user.model')

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    return res.status(200).json(users)
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params
    if (!userId) {
      console.log('Not found user!')
    } else {
      const user = await userModel.findById(userId)
      if (!user) {
        return res.status(404).json({
          message: 'User not found!',
        })
      } else {
        res.status(200).json(user)
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}

const createUser = async (req, res) => {
  try {
    const data = req.body
    if (!data.fullName && !!data.password && !data.studentCode) {
      return res.status(400).json({
        message: 'Full name ,password , student code are required!',
      })
    }
    if (!data) {
      console.log('Not found')
    } else {
      const user = await userModel.create(data)
      res.json(user)
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}

const updateUserById = async (req, res) => {
  try {
    const newUser = req.body
    const { userId } = req.params
    if (!userId) {
      return res.status(404).json({
        message: 'User not found!',
      })
    } else {
      const user = await userModel.findByIdAndUpdate(userId, newUser)
      if (!user) {
        return res.status(404).json({
          message: 'User not found!',
        })
      } else {
        res.status(200).json({
          user,
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}

const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params
    if (!userId) {
      console.log('Not found user!')
    } else {
      const user = await userModel.findByIdAndDelete(userId)
      if (!user) {
        return res.status(404).json({
          message: 'User not found!',
        })
      } else {
        return res.json({
          user,
        })
      }
    }
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
};
