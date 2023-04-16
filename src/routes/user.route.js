const express = require('express')

const router = express.Router()

const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require('../controllers/user.controller')

router.route('/users').get(getUsers).post(createUser)

router
  .route('/users/:userId')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)

module.exports = router
