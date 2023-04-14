const fs = require("fs");
const path = require("path");

const User = require(".././models/user.model");

const getUsers = (req, res, next) => {
  let users = User.find();
  res.json(users);
};

const getUserbyId = (req, res) => {
  const { id } = req.params;
  let users = User.findById(id);
  if (users) {
    res.json(users);
    return;
  }
  res.status(404).json({
    message: "NOT FOUND!!!",
  });
};

const createUser = (req, res) => {
  const user = new User(req.body);
  user.save();
  res.json({
    msg: "Create successfully!!",
  });
};

const updateUserById = (req, res) => {
  const newUsers = req.body;
  const { id } = req.params;
  let users = User.updateById(id, newUsers);
  res.json({
    newUsers: users,
  });
  // write file
  const usersJSON = JSON.stringify(user);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersJSON);
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  let users = User.deleteById(id);
  if (!users) res.json({ msg: "Users not found!" });
  else
    res.json({
      msg: "Delete successfully!!",
    });
  // write file
  const usersJSON = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersJSON);
};

module.exports = {
  getUsers,
  createUser,
  getUserbyId,
  updateUserById,
  deleteUserById,
};

// Difference between req.query[] and req.params
