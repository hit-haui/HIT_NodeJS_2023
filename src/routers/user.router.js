const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter
  .route("/")
  .get(authMiddleware, getUsers)
  .post(authMiddleware, createUser);

userRouter
  .route("/:userId")
  .get(authMiddleware, getUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

module.exports = userRouter;
