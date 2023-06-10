const express = require("express");

const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/User.controllers");
const userRouter = express.Router();
const authMiddleware = require('../middleware/Auth.middleware')
userRouter.route("/").get(getUsers).post(authMiddleware,createUser);

userRouter
  .route("/:userId")
  .get(getUserById)
  .put(authMiddleware,updateUserById)
  .delete(authMiddleware,deleteUserById);

module.exports = userRouter;
