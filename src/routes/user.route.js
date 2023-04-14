const express = require("express");
const { 
    getUsers, 
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route("/users")
.get(getUsers)
.post(createUser)

userRouter.route("/user/:id")
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById)

module.exports = userRouter;