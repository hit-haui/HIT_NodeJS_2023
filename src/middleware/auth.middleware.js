const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    const err = new Error("Unauthorized");
    err.status = 404;
    return next(err);
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const userId = payload.userId;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    if (user.role !== "admin") {
      throw new Error("Forbidden");
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authMiddleware;
