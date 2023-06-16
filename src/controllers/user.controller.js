const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    users,
  });
});

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  res.status(200).json({
    user,
  });
});

const createUser = catchAsync(async (req, res) => {
  const newUser = req.body;
  const { email, password } = newUser;

  console.log(newUser);

  if (!email || !password) {
    throw new ApiError("Email or password is required", 400);
  }

  const isUserExists = await User.exists({ email });
  if (isUserExists) {
    throw new ApiError("User is already exists", 400);
  }

  const user = await User.create(newUser);
  res.status(201).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const userRaw = req.body;
  const updatedUser = await User.findByIdAndUpdate(userId, userRaw, {
    new: true,
  });

  if (!updatedUser) {
    throw new ApiError("User not found", 404);
  }

  res.status(200).json({
    updatedUser,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new ApiError("User not found", 404);
  }

  res.status(204).json();
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
