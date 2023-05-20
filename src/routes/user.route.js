const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

const userRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

userRouter
  .route("/")
  .get(authMiddleware, getUsers)
  .post(authMiddleware, createUser);
userRouter
  .route("/:userId")
  .get(getUserById)
  .put(authMiddleware, updateUserById)
  .delete(authMiddleware, deleteUserById);

module.exports = userRouter;
