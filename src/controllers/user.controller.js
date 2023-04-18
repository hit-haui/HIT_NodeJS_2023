const User = require("../models/user.model");
const getUsers = (req, res) => {
  const getUsers = User.find();
  res.json({
    getUsers,
  });
};
const getUserById = (req, res) => {
  const getUsers = User.find();
  const { userId } = req.params;
  const getUser = getUsers.find((item) => item.id == userId);
  if (getUser) {
    res.json({ user });
  } else {
    res.json({ message: "User not found" });
  }
};
const createUser = (req, res) => {
  const userCreate = new User(req.body);
  const newUsers = userCreate.save();
  res.json({ newUsers });
};
const updateUserById = (req, res) => {
  const getUsers = User.find();
  const userUpdate = new User(req.body);
  const { userId } = req.params;
  const newUser = getUsers.map((item, index) => {
    if (item.id == userId) {
      return userUpdate;
    }
    return item;
  });
  res.json({ newUser });
};
const deleteUserById = (req, res) => {
  const getUsers = User.find();
  const { userId } = req.params;
  const Newusers = getUsers.filter((item) => item.id !== userId);
  res.json({ Newusers });
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
