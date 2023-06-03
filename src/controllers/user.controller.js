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
  try {
    const { userId } = req.params;
    const user = await User.findById({ userId });
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
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
  try {
    const newUser = req.body;
    if (!newUser.name || !newUser.password) {
      const err = new Error("User's information is not enough");
      err.status = 400;
      throw err;
    }

    const createUser = await User.create(newUser);
    res.status(200).json({
      createUser,
    });
  } catch (err) {
    next(err);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userRaw = req.body;
    const updateUser = await User.findByIdAndUpdate({ userId, userRaw });
    if (!updateUser) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ updateUser });
  } catch (err) {
    next(err);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deleteUser = await User.findByIdAndDelete({ userId });
    if (!deleteUser) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ deleteUser });
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
