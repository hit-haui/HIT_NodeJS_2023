const User = require("../models/users.model");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("User cannot found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const user = await User.create(newUser);
    res.status(201).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const { userId } = req.params;
    if (!userId) {
      const err = new Error("UserId is required");
      err.status = 401;
      throw err;
    }
    const userUpdate = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({
      userUpdate,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      new Error("UserId is required");
      err.status = 401;
      throw err;
    }
    const userDelete = await User.findByIdAndDelete(userId);
    res.status(201).json({
      userDelete,
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
