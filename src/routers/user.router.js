const express = require("express");
const { getUsers, createUser, getUser, updateUser, deleteUser } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route('/')
    .get(getUsers)
    .post(createUser)

userRouter.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = userRouter;
