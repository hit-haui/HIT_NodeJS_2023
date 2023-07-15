const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const register = catchAsync(async (req, res) => {
	const { userName, password, fullName } = req.body;
	if (!userName || !password) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Username or password is required!');
	}
	const existingUser = await User.findOne({ userName });
	if (existingUser) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists!');
	}
	const user = await User.create({ userName, password, fullName });
	res.status(httpStatus.CREATED).json({ user });
});

const login = catchAsync(async (req, res) => {
	console.log(req.body)
	const { userName, password } = req.body;
	const user = await User.findOne({ userName });
	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'User name or password is incorrect!');
	}

	const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY || 'super_secert', {
		expiresIn: process.env.JWT_EXPIRES_IN || '1h',
	});
	res.status(httpStatus.OK).json({ accessToken });
});

module.exports = { register, login };
