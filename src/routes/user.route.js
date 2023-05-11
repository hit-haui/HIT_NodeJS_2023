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

userRouter.route("/").get(getUsers).post(authMiddleware, createUser);

userRouter
  .route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = userRouter;