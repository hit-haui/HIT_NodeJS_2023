const User = require("../models/user.model");

// get users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users: users,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
};

// get user by id
const getUserById = async (req, res) => {
  const userId = req.params;
  try {
    const user = User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
};

// create user
const createUser = async (req, res) => {
  const newUser = req.body;
  if (!newUser.studentCode) {
    return res.status(400).json({
      msg: "studentCode is required!!",
    });
  }
  try {
    const user = await User.create(newUser);
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
};

// edit user information by id
const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const userRaw = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(userId, userRaw);
    if (!updateUser) {
      return res.status(404).json({
        msg: "User not found!!",
      });
    }
    res.status(200).json({
      updateUser,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const userDeleted = await User.findByIdAndDelete(userId);
    if (!userDeleted) {
      res.status(404).json({
        msg: "User not found!!",
      });
    }
    res.status(200).json({
      userDeleted,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
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
