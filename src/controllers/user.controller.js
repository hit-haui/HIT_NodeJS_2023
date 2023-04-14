const User = require("../models/user.model");
const data = require("../data/users.json");
const fs = require("fs");
const path = require("path");

const { request } = require("express");
const getUsers = (req, res) => {
  const users = User.find();
  res.json({
    users,
  });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  const users = User.find();
  const user = users.find((item) => {
    return item.id == id;
  });
  if (user) {
    res.json({
      user,
    });
  } else {
    res.json({
      msg: "not found",
    });
  }
};

const createUsers = (req, res) => {
  const user = new User({
    id: "4",
    avatar: "bbbbbbbbbbbbbbbb",
    fullName: "Hoang Thi Quynh",
    password: "3333333",
    studentCode: "2333334567",
    className: "HTTT",
    schoolYear: "16",
    clubYear: "13",
  });
  user.save();

  res.json({
    msg: "success",
  });
};

const updateUserById = (req, res) => {
  let users = User.find();
  const data = req.body;
  const id = req.params.id;
  const index = users.findIndex((item) => {
    item.id == id;
  });
  users.splice(index, 1, data);
  const userJson = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson);
  res.json(userJson);
};

//delete
const deleteUserById = (req, res) => {
  let users = User.find();
  const id = req.params.id;
  const user = users.find((item) => {
    item.id == id;
  });
  if (!user) {
    res.status(404).json({ error: "No Found !" });
    return;
  } else {
    const index = users.findIndex((item) => {
      item.id == id;
    });
    users.splice(index, 1);
    const userJson = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson);
    res.json(userJson);
  }
};
module.exports = {
  getUsers,
  getUserById,
  createUsers,
  updateUserById,
  deleteUserById,
};
