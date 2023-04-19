const { findById, pushData } = require("../models/user.model");
const User = require("../models/user.model");
const allUsers = User.getAllUser();

const getUserById = (req, res) => {
  const userId = Number(req.params.id);
  const user = User.findById(userId);
  if (user) res.json(user);
  else res.json({ msg: "User not found!!" });
};

const getAllUser = (req, res) => {
  res.json(User.getAllUser());
};

const createUser = (req, res) => {
  const newUser = new User(req.body);
  pushData(allUsers, newUser);
  User.save();
  res.json(allUsers);
};

const updateUserById = (req, res) => {
  const userId = Number(req.params.id);
  const user = findById(userId);
  if (!user) return res.json({ msg: "user not found!!!" });
  const newUser = new User(req.body);
  const index = allUsers.findIndex((item) => item.id === userId);
  Object.assign(allUsers[index], newUser);
  User.save();
  res.json(allUsers);
};

const deleteUserById = (req, res) => {
  const userId = Number(req.params.id);
  const user = findById(userId);
  if (!user) res.json({ msg: "user not found!!!!" });
  const index = allUsers.findIndex((item) => item.id === userId);
  const deleteUsers = allUsers.splice(index, 1);
  User.save();
  res.json(deleteUsers);
};

module.exports = {
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  getAllUser,
};
