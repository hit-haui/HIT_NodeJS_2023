const User = require(".././models/user.model");

const getUsers = (req, res, next) => {
  const users = User.find();
  res.json(users);
};

const getUserbyId = (req, res) => {
  const { id } = req.params;
  const user = User.findById(+id);

  if (!user) {
    return res.status(404).json({
      message: "NOT FOUND!!!",
    });
  }
  res.json(user);
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
  const newUsers = req.body;
  let users;
  try {
    users = User.User.updateById(+id, newUsers);
  } catch (error) {
    res.status(404).json({ error: `User with id ${id} not found` });
    return;
  }
  res.json({
    users, // the array of users returned after updating one use
  });
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  let users;
  try {
    users = User.deleteById(+id);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ error: `User with id ${id} not found` });
    return;
  }
  res.json({
    users, // the array of users returned after deleting one use
  });
};

module.exports = {
  getUsers,
  createUser,
  getUserbyId,
  updateUserById,
  deleteUserById,
};
