const User = require("../models/User.model");

const getUsers = async (req, res, next) => {
  try {
    const Users = await User.find();
    res.status(200).json({
      Users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
const createUser = async (req, res, next) => {
  const rawUser = req.body;
  const { name, password } = rawUser;
  try {
    if (!name || !password) {
      const err = new Error("Name or password is required!");
      err.status = 400;
      throw err;
    }
    const newUser = await User.create(rawUser);
    res.status(201).json({
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const newUser = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, newUser);
    if (!updatedUser) {
      const err = new Error(" user not found!");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      const err = new Error("User not found");
      err.status = 400;
      throw err;
    }
    res.status(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
