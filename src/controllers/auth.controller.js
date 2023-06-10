const User = require('../models/user.model');
const AppError = require('../middlewares/appError');

const asyncHandler = require('../middlewares/asyncHandler');

const register = asyncHandler(async (req, res, next) => {
    const { fullName, userCode, password } = req.body;
    if (!userCode || !password) {
        throw new AppError('Usercode or password is required!', 400);
    }
    const existingUser = await User.findOne({ userCode });
    if (existingUser) {
        throw new Error('User code is exit!');
    }
    const user = await User.create({ fullName, userCode, password });
    res.status(201).json({
        user
    });
});

module.exports = {
    register
};
