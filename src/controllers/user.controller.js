const User = require('../models/user.model');

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
        const err = new Error('User not found!');
        err.status = 404;
        throw err;
    }
    res.status(200).json({
        user
    });
});

const createUser = asyncHandler(async (req, res, next) => {
    const newUser = req.body;
    if (!newUser.userCode) {
        const err = new Error('User code is required!');
        err.status = 400;
        throw err;
    }
    const checkUser = await User.findOne({ userCode: newUser.userCode });
    if (checkUser) {
        const err = new Error('User code is exit!');
        err.status = 400;
        throw err;
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
        const err = new Error('User not found!');
        err.status = 404;
        throw err;
    }
    res.status(200).json({
        updatedUser
    });
});

const deleteUserById = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        const err = new Error('User not found!');
        err.status = 404;
        throw err;
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
