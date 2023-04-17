const { User } = require("../models/user.model");

const path = require("path");

const fs = require("fs");

const { v4: uuidv4 } = require("uuid");

const getUsers = (req, res) => {
  const users = User.find();
  res.json(users);
  for (let user of users) {
    if (!users.id) {
      user.id = uuidv4();
    }
  }
  const userJson = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = User.findById(id);
  res.json(user);
};

const createUser = (req, res) => {
  const data = req.body;
  const newUser = User.createUser(data);
  res.json(newUser);
};

const updateUserById = (req, res) => {
  const users = User.find();
  const data = req.body;
  const { id } = req.params;
  User.updateUser(id, data);
  res.json(users);
};

const deleteUserById = (req, res) => {
  const users = User.find();
  const { id } = req.params;
  User.deleteUser(id);
  res.json(users);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
