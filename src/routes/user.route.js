const express = require('express');

const router = express.Router();

const { 
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} = require('../controllers/user.controller');

router.get('/user',getUsers);

router.get('/user/:userId', getUserById);

router.post('/user',createUser);

router.put('/user/:userId', updateUserById);

router.delete('/user/:userId', deleteUserById);

module.exports = router;