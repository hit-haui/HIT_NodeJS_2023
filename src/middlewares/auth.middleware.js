const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            const err = new Error("Unauthorized!");
            err.status = 401;
            throw err;
        }
        const token = authorization.split(" ")[1];
        const payload = await jwt.verify(token, process.env.SECRET_KEY);
        if (!payload) {
            const err = new Error("Unauthorized");
            err.status = 401;
            throw err;
        }
        const userId = payload.userId;
        const user = await User.findById(userId);
        if (!user) {
            const err = new Error("User not found!");
            err.status = 404;
            throw err;
        }
        if (user.role !== "admin") {
            const err = new Error("Unauthorized");
            err.status = 401;
            throw err;
        }
        req.user = user;
        next();
    } catch (err) {
        err.status = 401;
        next(err);
    }
}

module.exports = authMiddleware;
