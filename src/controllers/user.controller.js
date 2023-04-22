const User = require("../models/user.model");

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

// get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

// create new user
const createUser = async (req, res) => {
  const newUser = req.body;
  if (!newUser.password || !newUser.studentCode || newUser === {}) {
    return res.status(400).json({
      message: "Invalid input data!",
    });
  }

  try {
    const user = await User.create(newUser);
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

// update user by id
const updateUserById = async (req, res) => {
  const updatedData = req.body;
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: `User with id ${id} not found!`,
      });
    }
    res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: `Error updating user with id ${id}: ${error.message}`,
    });
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        message: `User with id ${id} not found!`,
      });
    }
    res.status(200).json({
      user: deletedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: `Error deleting user with id ${id}: ${error.message}`,
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
