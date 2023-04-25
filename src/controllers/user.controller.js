const User = require("../models/user.model");

// get all users
const getUsers = async (req, res, next) => {
    try {
        const data = await User.find();
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    };
};

// get user by id
const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const data = await User.findById(userId);
        if (!data) {
            throw Object.assign(new Error('User not found!'), { status: 404 });
        }
        else return res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    };
};

// create user
const createUser = async (req, res, next) => {
    const newUser = req.body;
    try {
        if (!newUser.studentCode) {
            throw Object.assign(new Error('Student code is required!'), { status: 400 });
        }
        const data = await User.create(newUser);
        res.status(201).json({ data });
    }
    catch (err) {
        next(err);
    };
};

// edit user information by id
const updateUserById = async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    try {
        if (!newUser.studentCode) {
            throw Object.assign(new Error('Student code is required!'), { status: 400 });
        }
        const data = await User.findByIdAndUpdate(userId, newUser);
        if (!data) {
            throw Object.assign(new Error('User not found!'), { status: 404 });
        }
        else return res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    };
};

// delete user by id
const deleteUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const data = await User.findByIdAndDelete(userId);
        if (!data) {
            throw Object.assign(new Error('User not found!'), { status: 404 });
        }
        else return res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    };
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
};