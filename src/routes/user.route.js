const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.route("/").get(getUsers).post(authMiddleware, createUser);

userRouter
  .route("/:userId")
  .get(authMiddleware, getUserById)
  .put(authMiddleware, updateUserById)
  .delete(authMiddleware, deleteUserById);

module.exports = userRouter;
