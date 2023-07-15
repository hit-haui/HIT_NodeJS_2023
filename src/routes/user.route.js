const express = require('express');

const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	downloadUsers
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(createUser);

userRouter.route('/download').get(downloadUsers);

userRouter.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

module.exports = userRouter;
