const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUserById,
    creatUser,
    updateUserById,
    deleteUserById
} = require('../controllers/user.controller');

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", creatUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById)

module.exports = router;