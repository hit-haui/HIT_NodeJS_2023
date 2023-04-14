const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.post("/users", createUserById);
router.put("/users/:userId", updateUserById);
router.delete("/users/:userId", deleteUserById);

module.exports = router;
