const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.post("/users", createUsers);
router.put("/users/:userId", updateUserById);
router.delete("/users/:userId", deleteUserById);

module.exports = router;
