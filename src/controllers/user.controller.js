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

const getUser = async (req, res, next) => {
  const userId = req.params.userId || req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("User not found!");
      err.status = 401;
      throw err;
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const newUser = req.body;
  try {
    if (!newUser.name || !newUser.password) {
      const err = new Error("name or password is required");
      err.status = 400;
      throw err;
    }
    const user = await User.create(newUser);
    res.status(201).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const newUser = req.body;
    const updateUser = await User.findByIdAndUpdate(userId, newUser);
    if (!updateUser) {
      const err = new Error("User not found!");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      updateUser,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      const err = new Error("User not found!");
      err.status = 404;
      throw err;
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
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
