const User = require("../models/user.model");
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users: users,
    });
  } catch (err) {
    conslog.log(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  const data = req.body;
  try {
    const newUser = new User(data);
    await newUser.save();
    res.status(200).json({
      newUser,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateUser = await User.findByIdAndUpdate(id, data);
    if (!updateUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "A user has been updated",
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "A user has been deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
