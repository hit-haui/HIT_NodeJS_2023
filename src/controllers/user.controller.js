const User = require('../models/user.model');
const AppError = require('../middlewares/appError');

const asyncHandler = require('../middlewares/asyncHandler');

const getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        users
    });
});

const getUserById = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError('User not found!', 404);
    }
    res.status(200).json({
        user
    });
});

const createUser = asyncHandler(async (req, res, next) => {
    const newUser = req.body;
    if (!newUser.userCode) {
        throw new AppError('User code is required!', 400);
    }
    const checkUser = await User.findOne({ userCode: newUser.userCode });
    if (checkUser) {
        throw new AppError('User code is exit!', 400);
    }
    const user = await User.create(newUser);
    res.status(201).json({
        user
    });
});

const updateUserById = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const userRaw = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, userRaw, { new: true });
    if (!updatedUser) {
        throw new AppError('User not found!', 404);
    }
    res.status(200).json({
        updatedUser
    });
});

const deleteUserById = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new AppError('User not found!', 404);
    }
    res.status(200).json({
        deletedUser
    });
});

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
};
