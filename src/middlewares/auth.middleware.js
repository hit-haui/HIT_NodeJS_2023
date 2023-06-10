const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
    throw err;
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = payload.userId;
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    if (user.role !== "admin") {
      const err = new Error("Forbidden");
      err.status = 403;
      throw err;
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
