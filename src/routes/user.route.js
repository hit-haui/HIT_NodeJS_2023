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

const roles = require("../middlewares/role.middleware");

userRouter.use(authMiddleware);
userRouter.use(roles("admin"));

userRouter.route("/").get(getUsers).post(createUser);

userRouter.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

module.exports = userRouter;
