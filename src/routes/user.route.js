const express = require("express");
const userRouter = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

userRouter.route("/").get(getUsers).post(createUser);

userRouter.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

module.exports = userRouter;
