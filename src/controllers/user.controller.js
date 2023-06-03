const User = require('../models/user.model');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users
        });
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const err = new Error('User not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({
            user
        });
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    const newUser = req.body;
    try {
        if (!newUser.userCode) {
            const err = new Error('User code is required!');
            err.status = 400;
            throw err;
        }
        const checkUser = await User.findOne({ studentCode: newUser.studentCode });
        if (checkUser) {
            const err = new Error('User code is exit!');
            err.status = 400;
            throw err;
        }
        const user = await User.create(newUser);
        res.status(201).json({
            user
        });
    } catch (err) {
        next(err);
    }
};

const updateUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
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
    } catch (err) {
        next(err);
    }
};

const deleteUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            const err = new Error('User not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({
            deletedUser
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
};