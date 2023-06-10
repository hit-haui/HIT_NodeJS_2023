const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const asyncHandler = require('./asyncHandler');
const AppError = require('./appError');


const extractTokenFromHeader = (request) => {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}

const unauthorized = () => {
    throw new AppError('Unauthorized', 401);
}

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = extractTokenFromHeader(req);
    if (!token) return unauthorized();

    // verify token
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    // check user
    const user = await User.findById(payload.userId)
    if (!user) return unauthorized();

    // check role
    if (user.role !== 'admin') return unauthorized();

    next();
});

module.exports = authMiddleware;
