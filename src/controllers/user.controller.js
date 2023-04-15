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
  user.createUser();
  res.json({
    msg: "Create successfully!!",
  });
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  let newUsers = req.body;
  User.updateById(id, newUsers);
  res.json({
    msg: "Update successfully!!",
  });
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  User.deleteById(id);
  res.json({
    msg: "Delete successfully!!",
  });
};

module.exports = {
  getUsers,
  createUser,
  getUserbyId,
  updateUserById,
  deleteUserById,
};
