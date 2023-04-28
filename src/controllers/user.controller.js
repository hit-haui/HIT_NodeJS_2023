const User = require("../models/user.model");
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.fullName || !data.studentCode) {
      throw new Error("Need to add some user information");
    }
    const newUser = await User.create(data);
    res.status(201).json({
      newUser,
    });
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateUser = await User.findByIdAndUpdate(id, data);
    if (!updateUser) {
      throw new Error("User has not been updated");
    }
    res.status(200).json({
      updateUser,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new Error("User has not been deleted");
    }
    res.status(200).json({
      deleteUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
