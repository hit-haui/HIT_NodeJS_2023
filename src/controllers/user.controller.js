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
  const users = User.find();
  const user = users.find((item) => String(item.userId) === userId);

  if (!user) {
    return res.json({
      mgs: "not found",
    });
  }

  res.json({
    user,
  });
};

const createUser = (req, res) => {
  const newUser = req.body;
  const user = new User(newUser);
  user.save();
  res.json({
    newUser,
  });
};

const updateUserById = (req, res) => {
  const newUser = req.body;
  const userId = req.params.userId;
  const user = User.update(userId, newUser);
  return res.json({
    user,
  });
};

const deleteUserById = (req, res) => {
  const userId = req.params.userId;
  const user = User.delete(userId);
  res.json({
    user,
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
