const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const roles = require("../middleware/role.middleware");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.use(authMiddleware);
userRouter.use(roles(["admin"]));

userRouter.route("/").get(getUsers).post(createUser);

userRouter.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

module.exports = userRouter;
