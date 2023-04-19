const User = require("../models/user.model");


// get users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// get user by id
const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        // check user
        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }
        // return result
        res.status(200).json({
            user
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// create user
const createUser = async (req, res) => {
    // new user
    const newUser = req.body;
    // add new user to database
    try {
        await User.create(newUser);
        res.status(201).json({
            message: "Successfully created user!"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// update user by id
const updateUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        // check user
        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }
        // update user
        const userRaw = req.body;
        await User.findByIdAndUpdate(userId, userRaw);
        // send back the updated user info to client
        const updatedUser = await User.findById(userId);
        res.status(200).json({
            updatedUser
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// delete user by id
const deleteUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        // check user
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
            });
        }
        // delete user
        const userDeleted = await User.findByIdAndRemove(userId);
        // send back the deleted user info to client
        res.status(200).json({
            userDeleted 
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
};
