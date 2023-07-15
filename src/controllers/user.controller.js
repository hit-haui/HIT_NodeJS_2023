const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const ExcelJS = require('exceljs');

// http://localhost:3000/api/v1/users?fullName=Admin2
const getUsers = catchAsync(async (req, res) => {
  const { page = 1, sortBy, ...conditions } = req.query;
  const limit = 10;
  const skip = (parseInt(page) > 0) ? (page - 1) * limit : 0;
  let sort = sortBy ? sortBy.split(',').map(sortItem => {
    const [field, option = 'asc'] = sortItem.split(':');
    return [field, option === 'asc' ? 1 : -1];
  }) : [];
  const users = await User.find(conditions)
    .select('-__v -createdAt -updatedAt')
    .limit(limit)
    .skip(skip)
    .sort(sort);
  res.json({
    status: httpStatus.OK,
    message: 'List of users retrieved successfully!',
    data: users,
  });
});

// http://localhost:3000/api/v1/users/download
const downloadUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  // Tạo một workbook mới
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Users');

  // Ghi dữ liệu vào worksheet
  worksheet.columns = [
    { header: 'User Name', key: 'userName', width: 20 },
    { header: 'Full Name', key: 'fullName', width: 20 },
    { header: 'Date Of Birth', key: 'dateOfBirth', width: 30 },
  ];

  users.forEach(user => {
    worksheet.addRow({
      userName: user.userName,
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth
    });
  });

  const timestamp = new Date().getTime();
  const fileName = `user_${timestamp}.xlsx`;

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  await workbook.xlsx.write(res);
  res.end();
});

const getUser = catchAsync(async (req, res) => {
  const userId = req.params.userId || req.user.id;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  user.getAge();
  res.status((httpStatus.OK)).json({
    code: httpStatus.OK,
    message: 'Get users successfully',
    data: user.toJSON({ virtuals: true }),
  })
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
  downloadUsers
};
