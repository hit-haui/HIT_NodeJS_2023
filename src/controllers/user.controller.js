const User = require("../models/user.model");

// get all users
const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({ data });
  }
  catch (err) {
    res.status(500).json({ err: err.message });
  };
};

// get user by id
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await User.findById(userId);
    if (!data) return res.status(404).json({ message: 'User not found' });
    else return res.status(200).json({ data });
  }
  catch (err) {
    res.status(500).json({ err: err.message });
  };
};

// create user
const createUser = async (req, res) => {
  const newUser = req.body;
  try {
    const data = await User.create(newUser);
    res.status(200).json({ data });
  }
  catch (err) {
    res.status(500).json({ err: err.message });
  };
};

// edit user information by id
const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const newUser = req.body;
  try {
    const data = await User.findByIdAndUpdate(userId, newUser);
    if (!data) return res.status(404).json({ message: 'User not found' });
    else return res.status(200).json({ data });
  }
  catch (err) {
    res.status(500).json({ err: err.message });
  };
};

// delete user by id
const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await User.findByIdAndDelete(userId);
    if (!data) return res.status(404).json({ message: 'User not found' });
    else return res.status(200).json({ data });
  }
  catch (err) {
    res.status(500).json({ err: err.message });
  };
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
