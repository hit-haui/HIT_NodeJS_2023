const { User } = require("../models/user.model");

const getUsers = (req, res) => {
  const users = User.find();
  res.json(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = User.findById(id);
  if (!user) {
    return res.status(404).json({
      message: "Use not found",
    });
  }
  res.json(user);
};

const createUser = (req, res) => {
  const data = req.body;
  const newUser = User.createUser(data);
  res.json(newUser);
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const user = User.findById(id);
  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }
  const data = req.body;
  User.updateUser(id, data);
  res.json(User);
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  const user = User.findById(id);
  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }
  User.deleteUser(id);
  res.json(User);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
