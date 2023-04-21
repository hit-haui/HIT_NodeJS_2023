const User = require("../models/user.model.js");
const data = require("../data/users.json");

const getUsers = (req, res) => {
  const users = User.find();
  res.json({
    users,
  });
};

const getUserById = (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  const user = User.findUserById(userId);
  if (!user) {
    return res.status(401).json({
      mgs: "User not found",
    });
  }
  res.json({
    user,
  });
};

const createUsers = (req, res) => {
  const newUser = req.body;
  const user = new User(newUser);
  user.createUser();
  res.json({
    newUser,
  });
};

const updateUserById = (req, res) => {
  const newUser = req.body;
  const userId = req.params.userId;
  const user = User.findUserById(userId);
  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }
  User.update(userId, newUser);
  res.json({
    mgs: "update successful",
  });
};

const deleteUserById = (req, res) => {
  const userId = req.params.userId;
  const user = User.findUserById(userId);
  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }
  User.delete(userId);
  res.json({
    mgs: "delete successful",
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUsers,
  updateUserById,
  deleteUserById,
};
