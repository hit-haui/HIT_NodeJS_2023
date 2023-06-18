const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const roles = require('../middlewares/role.middleware');

const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.use(authMiddleware)
userRouter.use(roles(['admin']))

userRouter
  .route('/')
  .get(getUsers)
  .post(createUser);

userRouter
  .route('/:userId')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = userRouter;
