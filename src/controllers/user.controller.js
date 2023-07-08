const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const ExcelJS = require("exceljs");

const getUsers = catchAsync(async (req, res) => {
  const limit = 4;
  const { page = 1, sortBy, userName, age } = req.query;
  const skip = (page - 1) * limit;

  const query = {};
  if (userName) query.userName = userName;
  if (age) query.age = age;

  let sort = [];
  if (sortBy) {
    sortArray = sortBy.split(",");
    sort = sortArray.map((sortItem) => {
      const [field, value] = sortItem.split(":");
      return [field, value === "asc" ? 1 : -1];
    });
  }

  const users = await User.find(query).skip(skip).limit(limit).sort(sort);

  res.status(httpStatus.OK).json({ users });
});

const exportUser = catchAsync(async (req, res) => {
  const users = await User.find();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Users");

  worksheet.columns = [
    { header: "userName", key: "userName", width: 20 },
    { header: "dateOfBirth", key: "dateOfBirth", width: 20 },
    { header: "age", key: "age", width: 20 },
  ];

  users.forEach((user) => {
    const { userName, dateOfBirth, age } = user;
    worksheet.addRow({ userName, dateOfBirth, age });
  });

  const timestamp = new Date().getTime();
  const fileName = `user_${timestamp}.xlsx`;

  res.attachment(fileName);
  await workbook.xlsx.write(res);
  res.end();
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
  exportUser,
};
