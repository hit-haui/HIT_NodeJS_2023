const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

const userRoute = express.Router();

userRoute.route("/users").get(getUsers).post(authMiddleware, createUser);

userRoute
  .route("/users/:userId")
  .get(getUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

module.exports = userRoute;
