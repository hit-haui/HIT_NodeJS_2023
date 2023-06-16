const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(authMiddleware(['admin']), createUser);

userRouter
  .route('/:userId')
  .get(getUserById)
  .put(authMiddleware(['user', 'admin']), updateUserById)
  .delete(authMiddleware(['user', 'admin']), deleteUserById);

module.exports = userRouter;
