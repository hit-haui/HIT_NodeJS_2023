const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter
  .route("/")
  .get(authMiddleware, getUsers)
  .post(authMiddleware, createUser);

userRouter.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

module.exports = userRouter;
