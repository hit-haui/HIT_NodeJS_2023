const User = require("../models/user.model");

const handleNonExistUser = () => {
  const error = new Error("User not found!!!");
  error.status = 404;
  throw error;
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) return handleNonExistUser();

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const userData = req.body;
  const { role, password } = userData;

  try {
    if (!role || !password) {
      const err = new Error("Invalid input data!");
      err.status = 404;
      throw err;
    }
    const user = await User.create(userData);
    res.status(201).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) return handleNonExistUser();

    res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) return handleNonExistUser();

    res.status(200).json({
      deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
