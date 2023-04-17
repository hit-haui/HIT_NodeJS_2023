const User = require("../models/user.model");

// get users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user by id
const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create user
const createUser = async (req, res) => {
  const userRaw = req.body;
  const newUser = new User(userRaw);
  try {
    await newUser.save();
    res.status(201).json({ message: "Successfully created user!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// edit user information by id
const updateUserById = async (req, res) => {
  const userId = req.params.userId;
  const userRaw = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    await User.updateOne({ _id: userId }, userRaw);
    res.status(200).json({ message: "Successfully updated user information!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.find({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: "Successfully delete user!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
