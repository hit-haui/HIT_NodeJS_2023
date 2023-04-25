const User = require("../models/user.model");
const getUsers = (req, res) => {
  const users = User.find();
  res.json({
    users,
  });
};
const getUserById = (req, res) => {
  const { userId } = req.params;
  const user = User.getById(userId);
  res.json({
    user,
  })
};
const createUser = (req, res) => {
  const userCreated = new User(req.body);
  userCreated.create();
  res.json({
    message:"Create successful",
  })
};
const updateUserById = (req, res) => {
  const userUpdated = new User(req.body);
  const { userId } = req.params;
  const user = User.getById(userId);
  if (!user) {
    res.status(401).json({
      message: "User not found!"
    })
  }
  User.updateById(userId,userUpdated);
  res.json({ message:"Update successful" });
};
const deleteUserById = (req, res) => {
  const { userId } = req.params;
  const user = User.getById(userId);
  if (!user) {
    res.status(401).json({ message: "User not found" })
  }
  User.deleteById(userId)
  res.json({ message:"Delete successful" });
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
