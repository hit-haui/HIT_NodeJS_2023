const User = require("../models/user.model");
const getUsers = (req, res) => {
  const getUsers = User.find();
  res.json({
    getUsers,
  });
};
const getUserById = (req, res) => {
  const users = User.find();
  const { userId } = req.params;
  const user = users.find((item) => item.id == userId);
  if (user) {
    res.json({ user });
  } else {
    res.json({ message: "User not found" });
  }
};
const createUser = (req, res) => {
  const newUser = new User(req.body);
  const users = newUser.save();
  res.json({ users });
};
const updateUserById = (req, res) => {
  const user = User.find();
  const userUpdate = new User(req.body);
  const { userId } = req.params;
  const newUser = user.map((item, index) => {
    if (item.id == userId) {
      return userUpdate;
    }
    return item;
  });
  res.json({ newUser });
};
const deleteUserById = (req, res) => {
  const user = User.find();
  const { userId } = req.params;
  const users = user.filter((item) => item.id !== userId);
  res.json({ users });
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
