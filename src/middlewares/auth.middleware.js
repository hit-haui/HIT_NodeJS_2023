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

const authMiddleware = (allowedRoles) => asyncHandler(async (req, res, next) => {
    const token = extractTokenFromHeader(req);
    if (!token) return unauthorized();

    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(payload.userId);
    if (!user) return unauthorized();

    if (!allowedRoles.includes(user.role)) return unauthorized();
    req.user = user;
    next();
});

module.exports = authMiddleware;
