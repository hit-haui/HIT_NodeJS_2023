const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
var XLSX = require("xlsx");
const path = require("path");

const getUsers = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, sortBy, ...conditions } = req.query;

  let sort = sortBy
    ? sortBy.split(",").map((sortItem) => {
        const [field, option = "asc"] = sortItem.split(":");
        return [field, option === "asc" ? 1 : -1];
      })
    : [];

  // pagination
  const skip = parseInt(page) > 0 ? (page - 1) * limit : 0;

  // plain JS object
  const users = await User.find(conditions)
    .select("-createdAt -updatedAt -__v -password -avatar")
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .lean();

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "Get users successfully!",
    data: users,
  });
});

const exportUsersToExcel = catchAsync(async (req, res) => {
  const users = await User.find().select(
    "-createdAt -updatedAt -__v -password -avatar"
  );

  const sheet_name = "sheet1";

  var workbook = XLSX.utils.book_new();

  var worksheet = XLSX.utils.json_to_sheet(users);

  XLSX.utils.book_append_sheet(workbook, worksheet, sheet_name);

  await XLSX.writeFile(workbook, path.join(__dirname, "../data/users.xlsx"));

  res.send("users.xlsx");
});

const getUser = catchAsync(async (req, res) => {
  const userId = req.params.userId || req.user.id;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  user.getAge();
  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "Get users successfully",
    data: user.toJSON({ virtuals: true }),
  });
  // res.status(httpStatus.OK).json({ user: user.toJSON({ virtuals: true }) });
});

const createUser = catchAsync(async (req, res) => {
  const newUser = req.body;
  const { userName, password } = newUser;
  if (!userName || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Username or password is required!"
    );
  }
  const checkUser = await User.findOne({ userName: newUser.userName });
  if (checkUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists!");
  }
  const user = await User.create(newUser);
  res.status(httpStatus.CREATED).json({ user });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const newUser = req.body;
  const user = await User.findByIdAndUpdate(userId, newUser);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  res.status(httpStatus.OK).json({ user });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  res.status(httpStatus.OK).json({ user });
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  exportUsersToExcel,
};
