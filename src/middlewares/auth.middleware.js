const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const extractTokenFromHeader = (req) => {
  const [type, token] = req.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
};

const authMiddleware = async (req, res, next) => {
  const token = extractTokenFromHeader(req);

  try {
    if (!token) {
      throw new ApiError("Unauthorized", 401);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { userId } = payload;
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError("Unauthorized", 401);
    }

    if (user.role !== "admin") {
      throw new ApiError("Forbidden", 403);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
