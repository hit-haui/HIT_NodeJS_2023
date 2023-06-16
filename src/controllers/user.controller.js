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
    if (!newUser.userName) {
        throw new AppError('Username is required!', 400);
    }
    const existingUser = await User.findOne({ userName: newUser.userName });
    if (existingUser) {
        throw new AppError('Username is exit!', 400);
    }
    const user = await User.create(newUser);
    res.status(201).json({
        user
    });
});

const updateUserById = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    if (req.user.role === 'admin' || req.user.id === userId) {
        const updatedUser = await User.findByIdAndUpdate(userId, newUser);
        if (!updatedUser) {
            throw new AppError('User not found!', 404);
        }
        res.status(200).json({
            updatedUser
        });
    } else {
        throw new AppError('You are not authorized to update this user!', 401);
    }
});

const deleteUserById = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    if (req.user.role === 'admin' || req.user.id === userId) {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new AppError('User not found!', 404);
        }
        res.status(200).json({
            deletedUser
        });
    } else {
        throw new AppError('You are not authorized to delete this user!', 401);
    }
});

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
};
