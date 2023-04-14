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
    msg: "Create successfully",
  });
};

const updateUserById = (req, res) => {
  const newUsers = req.body;
  const { id } = req.params;
  console.log(id);
  let users = User.updateById(id, newUsers);
  res.json({
    newUsers: users,
  });
};

const deleteUserById = (req, res) => {
  const user = new User(req.body);
  user.deleteById(req.params.id);
  console.log(req.params.id);
};

module.exports = {
  getUsers,
  createUser,
  getUserbyId,
  updateUserById,
  deleteUserById,
};

// Difference between req.query[] and req.params
