const { allUser, findById, pushData } = require("../models/user.model");
const User = require("../models/user.model");
const allUsers = User.getAllUser();

const getUserById = (req, res) => {
  const userId = req.params.id;
  const user = User.findById(userId);
  if (user) res.json(user);
  else res.json({ msg: "User not found!!" });
};

const getAllUser = (req, res) => {
  res.json(User.getAllUser());
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
  pushData(allUsers,newUser);
  User.save();
  res.json(allUsers);
};

const updateUserById = (req, res) => {
  const userId = req.params.id;
  const user = findById(userId);
  if (!user) return res.json({ msg: "user not found!!!" });
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
  let index = allUsers.findIndex((item) => item.id == userId);
  Object.assign(allUser[index], newUser);
  User.save();
  res.json(allUsers);
};

const deleteUserById = (req, res) => {
  const userId = req.params.id;
  const user = findById(userId);
  if (!user) res.json({ msg: "user not found!!!!" });
  const index = allUsers.findIndex(
    (item) => Number(item.id) === Number(userId)
  );
  allUsers.splice(index, 1);
  User.save();
  res.json(allUsers);
};

module.exports = {
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  getAllUser,
};
