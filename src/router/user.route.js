const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

const userRoute = express.Router();

userRoute.route("/users").get(getUsers).post(createUser);

userRoute
  .route("/users/:userId")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = userRoute;
