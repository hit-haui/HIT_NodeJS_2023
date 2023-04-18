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
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = User.updateById(+id, updateData);
    if (!updatedUser) {
      return res.status(404).json({ error: `User with id ${id} not found` });
    }
    res.json({ updatedUser });
  } catch (err) {
    console.error(err.message);
  }
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = User.deleteById(+id);
    if (!deletedUser) {
      return res.status(404).json({ error: `User with id ${id} not found` });
    }
    res.json({ deletedUser });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserbyId,
  updateUserById,
  deleteUserById,
};
