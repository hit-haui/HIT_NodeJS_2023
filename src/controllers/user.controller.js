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
  let users = User.updateById(id, newUsers);
  res.json({
    newUsers: users,
  });

  User.saveFile(newUsers);
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  let users = User.deleteById(id);
  if (!users) res.json({ msg: "Users not found!" });
  else
    res.json({
      msg: "Delete successfully!!",
    });

  User.saveFile(users);
};

module.exports = {
  getUsers,
  createUser,
  getUserbyId,
  updateUserById,
  deleteUserById,
};
