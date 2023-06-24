const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

const authMiddleware = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const userRoute = express.Router();

userRoute
  .route("/users")
  .get(authMiddleware, role(["admin"]), getUsers)
  .post(authMiddleware, role(["admin"]), createUser);

userRoute
  .route("/users/:userId")
  .get(authMiddleware, role(["admin"]), getUser)
  .put(authMiddleware, role(["admin"]), updateUser)
  .delete(authMiddleware, role(["admin"]), deleteUser);

module.exports = userRoute;
