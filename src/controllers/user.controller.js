const User = require("../models/user.model");

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      users,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      error: error.message,
    });
  }
};

// get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// create new user
const createUser = async (req, res) => {
  const newUser = req.body;

  try {
    const user = await User.create(newUser);
    if (!user) {
      return res.status(400).json({
        message: "Invalid input data!",
      });
    }

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

// update user by id
const updateUserById = async (req, res) => {
  const updatedData = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: `User with id ${id} not found!`,
      });
    }

    const updatedUser = await User.findOneAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: `User with id ${id} not found!`,
      });
    }

    const deletedUser = await User.findOneAndDelete({ _id: id });
    res.status(200).json({
      user: deletedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
