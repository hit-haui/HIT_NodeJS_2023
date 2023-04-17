const express = require("express");
const router = express.Router();

const {
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getAllUser,
} = require("../controllers/user.controller");

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
