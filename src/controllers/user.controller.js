const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const getUsers = catchAsync(async (req, res) => {
	const users = await User.find();
	res.status(httpStatus.OK).json({ users });
});

const getUser = catchAsync(async (req, res) => {
	const userId = req.params.userId || req.user.id;
	const user = await User.findById(userId);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
	res.status(httpStatus.OK).json({ user });
});

const createUser = catchAsync(async (req, res) => {
	const newUser = req.body;
	const { userName, password } = newUser;
	if (!userName || !password) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Username or password is required!',
		);
	}
	const checkUser = await User.findOne({ userName: newUser.userName });
	if (checkUser) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists!');
	}
	const user = await User.create(newUser);
	res.status(httpStatus.CREATED).json({ user });
});

const updateUser = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const newUser = req.body;
	const user = await User.findByIdAndUpdate(userId, newUser);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
	}
	res.status(httpStatus.OK).json({ user });
});

const deleteUser = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const user = await User.findByIdAndDelete(userId);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
	}
	res.status(httpStatus.OK).json({ user });
});

module.exports = {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};
