const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const extractTokenFromHeader = (request) => {
	const [type, token] = request.headers.authorization?.split(' ') ?? [];
	return type === 'Bearer' ? token : undefined;
};

const authMiddleware = catchAsync(async (req, res, next) => {
	const accessToken = extractTokenFromHeader(req);
	if (!accessToken) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
	}
	const payload = jwt.verify(accessToken, process.env.SECRET_KEY || 'super_secert');
	const { userId } = payload;
	const user = await User.findById(userId);
	if (!user) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
	}
	req.user = user;
	next();
});

module.exports = authMiddleware;
