const express = require("express");
const userRouter = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");

userRouter.route("/").get(getUsers).post(authMiddleware, createUser);

userRouter
  .route("/:userId")
  .get(getUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

module.exports = userRouter;
