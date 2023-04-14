const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserbyId);
router.post("/create", userController.createUser);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

module.exports = router;
