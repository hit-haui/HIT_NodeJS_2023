const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,

} = require("../controllers/user.Controller")



router.get("/users", getUsers); 
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUserById); 
router.delete("/users/:id", deleteUserById);

module.exports = router;
