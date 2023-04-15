const User = require('../models/user.model');
const users = User.getAllUser();


// get users
const getUsers = (req, res) => {
    res.status(200).json({
        users: users
    });
};


// get user by id
const getUserById = (req, res) => {
    const userId = req.params.id;
    // check user
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
        return res.status(404).json({
            message: "User not found!"
        });
    }
    // find user by id
    const user = User.findUser(index);
    res.status(200).json({
        user: user
    });
};


// create user
const createUser = (req, res) => {
    // new user
    const userRaw = req.body;
    const newUser = new User(userRaw);
    // add new user to file
    newUser.addUser();
    res.status(200).json({
        message: "Successfully created user!"
    });
};


// edit user information by id
const updateUserById = (req, res) => {
    const userId = req.params.id;
    // check user
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
        return res.status(404).json({
            message: "User not found!"
        });
    }
    // update user
    const userRaw = req.body;
    User.updateUser(index, userRaw);
    res.status(200).json({
        message: "Successfully updated user information!"
    });
};


// delete user by id
const deleteUserById = (req, res) => {
    const userId = req.params.id;
    // check user
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
        return res.status(404).json({
            message: "User not found!"
        });
    }
    // delete user
    User.deleteUser(index);
    res.status(200).json({
        message: "Successfully delete user!"
    });
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};