const express = require('express');
const { getUsers, addUser, getUserById, updateUserById, deleteUserById } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.route('/')
    .get(getUsers)
    .post(addUser)
userRouter.route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)

module.exports = userRouter;