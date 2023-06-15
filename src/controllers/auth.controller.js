const User = require('../models/user.model');
const AppError = require('../middlewares/appError');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const asyncHandler = require('../middlewares/asyncHandler');

const register = asyncHandler(async (req, res, next) => {
    const { fullName, userName, password } = req.body;
    if (!userName || !password) {
        throw new AppError('Username or password is required!', 400);
    }
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
        throw new Error('Username is exit!', 400);
    }
    const user = await User.create({ fullName, userName, password });
    res.status(201).json({
        user
    });
});


const login = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
        throw new AppError('Username or password is incorrect!', 401);
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
        throw new AppError('Username or password is incorrect!', 401);
    }
    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
    res.status(200).json({
        accessToken,
    });
});


module.exports = {
    register,
    login
};
