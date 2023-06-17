const User = require("../models/user.model");
const asyncHandler = require("../middlewares/asyncHandle.middleware");

const handleNonExistUser = () => {
  const error = new Error("User not found!!!");
  error.status = 404;
  throw error;
};

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId || req.user.id;
  const user = await User.findById(userId).select("+password");

  if (!user) return handleNonExistUser();

  res.status(200).json({
    user,
  });
});

const createUser = asyncHandler(async (req, res, next) => {
  const userData = req.body;
  const { role, password } = userData;

  if (!role || !password) {
    const err = new Error("Invalid input data!");
    err.status = 404;
    throw err;
  }
  const user = await User.create(userData);
  res.status(201).json({
    user,
  });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const updatedData = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  });

  if (!updatedUser) return handleNonExistUser();

  res.status(200).json({
    updatedUser,
  });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) return handleNonExistUser();

  res.status(200).json({
    deletedUser,
  });
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
