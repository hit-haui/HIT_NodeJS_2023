const User = require("../models/user.model");

// get all users
const getUsers = (req, res) => {
  User.find()
    .then(data => res.json({ data }))
    .catch(err => res.status(500).json({ err: err.message }))
};

// get user by id
const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(data => {
      if (!data) return res.status(404).json({ message: 'User not found' });
      else return res.status(200).json({ data });
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

// create user
const createUser = (req, res) => {
  const newUser = req.body;
  User.create(newUser)
    .then(data => res.json({ "New User": data }))
    .catch(err => res.status(500).json({ err: err.message }));
};

// edit user information by id
const updateUserById = (req, res) => {
  const { userId } = req.params;
  const newUser = req.body;
  User.findByIdAndUpdate(userId, newUser)
    .then(data => {
      if (!data) return res.status(404).json({ message: 'User not found' });
      else return res.status(200).json({ data });
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

// delete user by id
const deleteUserById = (req, res) => {
  const { userId } = req.params;
  User.findByIdAndDelete(userId)
    .then(data => {
      if (!data) return res.status(404).json({ message: 'User not found' });
      else return res.status(200).json({ data });
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
