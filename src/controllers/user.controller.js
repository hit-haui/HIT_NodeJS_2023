const User = require("../models/user.model");
const bcrypt = require("bcrypt")
// get users
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


// get user by id
const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        // Check user
        if (!user) {
            const err = new Error('User not found!');
            err.status = 404;
            throw err;
        }
        // Return result
        res.status(200).json({
            user
        });
    } catch (err) {
        next(err);
    }
};


// create user
const createUser = async (req, res, next) => {
    // New user
    const newUser = req.body;
    try {
        // Check if there is a required field
        if (!newUser.studentCode) {
            const err = new Error('Student code is required!');
            err.status = 400;
            throw err;
        }
        // Add new user to database
        const checkUser = await User.findOne({ studentCode: newUser.studentCode });
        if (checkUser) {
            const err = new Error('Student code is exit!');
            err.status = 400;
            throw err;
        }
        newUser.password = await bcrypt.hash(newUser.password, 7);
        const user = await User.create(newUser);
        res.status(201).json({
            user
        });
    } catch (err) {
        next(err);
    }
};


// update user by id
const updateUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const userRaw = req.body;
        // Update user
        const updatedUser = await User.findByIdAndUpdate(userId, userRaw, { new: true });
        // Check user
        if (!updatedUser) {
            const err = new Error('User not found!');
            err.status = 404;
            throw err;
        }
        // Send back the updated user info to client
        res.status(200).json({
            updatedUser
        });
    } catch (err) {
        next(err);
    }
};


// delete user by id
const deleteUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        // Delete user
        const deletedUser = await User.findByIdAndDelete(userId);
        // Check user
        if (!deletedUser) {
            const err = new Error('User not found!');
            err.status = 404;
            throw err;
        }
        // Send back the deleted user info to client
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
