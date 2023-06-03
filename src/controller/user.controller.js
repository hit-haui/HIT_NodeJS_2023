const User = require("../model/user.model");
const getUsers = async (req, res, next) => {
  const Users = await User.find();
  try {
    if (!Users) {
      const err = new Error("Users not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ Users });
  } catch (err) {
    next(err);
  }
};
const getUserById = async (req, res, next) => {
  const { UserId } = req.params;
  try {
    const User = await User.findById(UserId);
    if (!User) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ User });
  } catch (err) {
    next(err);
  }
};
const createUser = async (req, res, next) => {
  const userCreated = req.body;
  try {
    if (userCreated.role!='admin') {
      const err = new Error("ko co quyen tao user");
      err.status = 404;
      throw err;
    }
    const newUser = await User.create(userCreated);
    res.status(201).json({ newUser });
  } catch (err) {
    next(err);
  }
};
const updateUserById = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const updateUser = req.body;
    if (!userId) {
      const err = new Error("useId is not exist!");
      err.status = 404;
      throw err;
    }
    const userUpdated = User.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });
    if (!userUpdated) {
      const err = new Error("userId is not found!");
      err.status = 404;
      throw err;
    }
    res.json({ updateUser });
  } catch (err) {
    next(err);
  }
};
const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    const err = new Error("userId not exist!");
    err.status = 404;
    throw err;
  }
  try {
    const userDeleted = await User.findByIdAndDelete(userId);
    if (!userDeleted) {
      const err = new Error("user not found!");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      userDeleted,
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
