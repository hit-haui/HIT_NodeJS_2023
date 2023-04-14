const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

router.route("/users").get(getUsers).post(createUsers);

router
  .route("/users/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);
module.exports = router;
