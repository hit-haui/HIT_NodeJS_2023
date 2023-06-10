const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const userRouter = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controller/user.controller");
userRouter.route("/").get(authMiddleware,getUsers).post(createUser);

userRouter
  .route("/:userId")
  .get(authMiddleware,getUserById)
  .put(authMiddleware,updateUserById)
  .delete(authMiddleware,deleteUserById);
module.exports = userRouter;
