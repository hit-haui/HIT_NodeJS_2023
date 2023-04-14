const express = require("express");
const router = express.Router();

const {
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

router.get("/", getUserById);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
