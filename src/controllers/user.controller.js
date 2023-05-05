const User = require("../models/user.model");

// get users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

// get user by id
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    // Check user
    if (!user) {
      throw Object.assign(new Error(`User with id ${userId} not found!`), {
        status: 400,
      });
    }
    // Return result
    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

// create user
const createUser = async (req, res) => {
  // New user
  const newUser = req.body;
  // Check if there is a required field
  const { studentCode } = req.body;
  if (!studentCode) {
    return res.status(400).json({
      message: "Student code is required!",
    });
  }
  // Add new user to database
  try {
    const user = await User.create(newUser);
    res.status(201).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

// update user by id
const updateUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedData = req.body;
    // Update user
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    // Check user
    if (!updatedUser) {
      throw Object.assign(new Error(`User with id ${userId} not found!`), {
        status: 400,
      });
    }
    // Send back the updated user info to client
    res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    // Delete user
    const deletedUser = await User.findByIdAndDelete(userId);
    // Check user
    if (!deletedUser) {
      throw Object.assign(new Error(`User with id ${userId} not found!`), {
        status: 400,
      });
    }
    // Send back the deleted user info to client
    res.status(200).json({
      deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
