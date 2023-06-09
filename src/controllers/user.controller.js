const User = require("../models/user.model");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users
        });
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
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
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    const newUser = req.body;
    const { email, password } = newUser;
    try {
        if (!email || !password) {
            const err = new Error('Email or password is required!');
            err.status = 400;
            throw err;
        }

        const isUserExists = await User.exists({ email });
        if (isUserExists) {
            const err = new Error('User is exists!');
            err.status = 400;
            throw err
        }

        const user = await User.create(newUser);
        res.status(201).json({
            user
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const userRaw = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, userRaw, { new: true });

        if (!updatedUser) {
            const err = new Error('User not found!');
            err.status = 404;
            throw err;
        }

        res.status(200).json({
            updatedUser
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            const err = new Error('User not found!');
            err.status = 404;
            throw err;
        }

        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
