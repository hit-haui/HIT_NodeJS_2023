const User = require("../models/user.model");

// get users
const getUsers = (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: err.message }))
};

// get user by id
const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      return res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ message: err.message }))
};

// create user
const createUser = (req, res) => {
  const newUser = req.body;
  User.create(newUser)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ message: err.message }))
};

// edit user information by id
const updateUserById = (req, res) => {
  const { userId } = req.params;
  const updateUser = req.body;
  User.findByIdAndUpdate({ _id: userId }, updateUser)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      return res.status(200).json({ message: "Successfully updated user information!" });
    })
    .catch(err => res.status(500).json({ message: err.message }))
};

// delete user by id
const deleteUserById = (req, res) => {
  const { userId } = req.params;
  User.findByIdAndDelete({ _id: userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(204).json();
    })
    .catch(err => res.status(500).json({ message: err.message }))
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
