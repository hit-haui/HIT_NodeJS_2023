const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const ExcelJS = require('exceljs');

const getUsers = catchAsync(async (req, res) => {
  const { page, limit, sortBy, ...conditions } = req.query;
	const pageNumber = parseInt(page) || 1;
	const limitNumber = parseInt(limit) || 10;
	const skip = (pageNumber - 1) * limitNumber;
	let sort = [];
	if (sortBy) {
		const arrSortBy = sortBy.split(',');
		arrSortBy.forEach((item) => {
			const [field, value] = item.split(':');
			sort.push([field, value === 'asc' ? 1 : -1]);
		});
	}
	const users = await User.find(conditions)
		.limit(limit)
		.skip(skip)
		.sort(sort)
    .lean();
  res.status(httpStatus.OK).json({ users });
});

const exportUsersToExcel = catchAsync(async (req, res) => {
  const users = await User.find();

	const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Users');
  
	worksheet.columns = [
		{ header: 'ID', key: 'id', width: 30 },
		{ header: 'Username', key: 'userName', width: 30 },
		{ header: 'FullName', key: 'fullName', width: 50 },
		{ header: 'Role', key: 'role', width: 30 },
	];

	users.forEach((user) => {
		worksheet.addRow({
			id: user._id,
			userName: user.userName,
			fullName: user.fullName,
			role: user.role,
		});
	});

  const filePath = './uploads/users.xlsx';
	await workbook.xlsx.writeFile(filePath);

	res.download(filePath);
});

const getUser = catchAsync(async (req, res) => {
	const userId = req.params.userId || req.user.id;
	const user = await User.findById(userId);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
	user.getAge();
	res.status(httpStatus.OK).json({
		code: httpStatus.OK,
		message: 'Get users successfully',
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
			'Username or password is required!',
		);
	}
	const checkUser = await User.findOne({ userName: newUser.userName });
	if (checkUser) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists!');
	}
	const user = await User.create(newUser);
	res.status(httpStatus.CREATED).json({ user });
});

const updateUser = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const newUser = req.body;
	const user = await User.findByIdAndUpdate(userId, newUser);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
	}
	res.status(httpStatus.OK).json({ user });
});

const deleteUser = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const user = await User.findByIdAndDelete(userId);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
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
