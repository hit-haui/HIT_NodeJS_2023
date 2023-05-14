const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        const err = new Error('Unauthorized!');
        err.status = 401;
        return next(err);
    }

    const token = authorization.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        const { userId } = payload;
        const user = await User.findById(userId);
        if (!user) {
            const err = new Error("User not found!");
            err.status = 404;
            throw err;
        }

        if (user.role !== 'admin') {
            const err = new Error('Forbidden');
            err.status = 403;
            throw err;
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = authMiddleware;
