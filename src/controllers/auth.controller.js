const User = require('../models/user.model');
const AppError = require('../middlewares/appError');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const asyncHandler = require('../middlewares/asyncHandler');

const register = asyncHandler(async (req, res, next) => {
    const { fullName, userCode, password } = req.body;
    if (!userCode || !password) {
        throw new AppError('Usercode or password is required!', 400);
    }
    const existingUser = await User.findOne({ userCode });
    if (existingUser) {
        throw new Error('Usercode is exit!', 400);
    }
    const user = await User.create({ fullName, userCode, password });
    res.status(201).json({
        user
    });
});


const login = asyncHandler(async (req, res, next) => {
    const { userCode, password } = req.body;
    const user = await User.findOne({ userCode });
    if (!user) {
        throw new AppError('Usercode or password is incorrect!', 401);
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
        throw new AppError('Usercode or password is incorrect!', 401);
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
