const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authMiddleware = async (req, res, next) => {
  // In Postman use Query Params: [key, value] = [permission, admin]
  const authorization = req.headers.authorization;
  if (!authorization) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
    throw err;
  }
  try {
    console.log(authorization);
    const token = authorization.split(" ")[1];
    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    console.log(payload);
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
