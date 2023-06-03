const express = require("express");

const userRouter = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controller/user.controller");
userRouter.route("/").get(getUsers).post(createUser);

userRouter
  .route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);
module.exports = userRouter;
