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
  .get(authMiddleware, getUsers)
  .post(authMiddleware, createUser);

userRouter
  .route('/:userId')
  .get(getUserById)
  .put(authMiddleware, updateUserById)
  .delete(authMiddleware, deleteUserById);

module.exports = userRouter;
