const User = require("../models/user.model");

// get users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);
  }
};

// get user by id
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

// create user
const createUser = async (req, res) => {
  const userRaw = req.body;
  try {
    const newUser = new User(userRaw);
    const user = await User.create(newUser);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(201).json({
      newUser,
    });
  } catch (err) {
    console.log(err);
  }
};

// edit user information by id
const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const userRaw = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, userRaw);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
