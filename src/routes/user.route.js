const express = require('express');

const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const userRouter = express.Router();

// userRouter.use(authMiddleware);
// userRouter.use(roleMiddleware(['admin', 'user']));

userRouter.route('/').get(getUsers).post(createUser);

userRouter.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

module.exports = userRouter;
