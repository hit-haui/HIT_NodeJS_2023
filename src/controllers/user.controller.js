const { allUser, findById } = require("../models/user.model");
const User = require("../models/user.model");
const allUsers = User.getAllUser();

const getUserById = (req, res) => {
  const userId = req.params.id;
  const user = User.findById(userId);
  if (user) res.json(user);
  else res.json({ msg: "User not found!!" });
};

const createUser = (req, res) => {
  const data = req.body;
  const newUser = new User(
    data.id,
    data.avatar,
    data.fullName,
    data.dateOfBirth,
    data.password,
    data.studentCode,
    data.className,
    data.schoolYear,
    data.clubYear
  );
  allUsers.push({ ...newUser });
  User.save();
  res.json(allUsers);
};

const updateUserById = (req, res) => {
  const userId = req.params.id;

  const user = findById(userId);
  console.log(user);
  if (!user) res.json({ msg: "user not found!!!" });
  const data = req.body;

  const newUser = new User(
    data.id,
    data.avatar,
    data.fullName,
    data.dateOfBirth,
    data.password,
    data.studentCode,
    data.className,
    data.schoolYear,
    data.clubYear
  );
  console.log(newUser);
  let index = allUsers.findIndex((item) => item.id == userId);
  Object.assign(allUsers[index], newUser);
  User.save();
  res.json(allUsers);
};

const deleteUserById = (req, res) => {
  const userId = req.params.id;
  const user = findById(userId);
  if (!user) res.json({ msg: "user not found!!!!" });
  const index = allUsers.findIndex((item) => item.id == userId);
  allUsers.splice(index, 1);
  User.save();
  res.json(allUsers);
};

module.exports = {
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
