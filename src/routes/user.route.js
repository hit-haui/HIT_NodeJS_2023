const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");
router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/user", createUser);
router.put("/:userId", updateUserById);
router.delete("/:productId", deleteUserById);
module.exports = router;