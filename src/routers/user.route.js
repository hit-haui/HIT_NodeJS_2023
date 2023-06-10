const express = require("express");

const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/User.controllers");
const userRouter = express.Router();

userRouter.route("/").get(getUsers).post(createUser);

userRouter
  .route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = userRouter;
