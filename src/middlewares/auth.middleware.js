const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const unauthorized = () => {
  const err = new Error("Unauthorized!");
  err.status = 401;
  throw err;
};

const forbidden = () => {
  const err = new Error("Forbidden!!");
  err.status = 403;
  throw err;
};

const extractTokenFromHeader = (request) => {
  const [type, token] = request.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
};

const authMiddleware = async (req, res, next) => {
  const token = extractTokenFromHeader(req);
  if (!token) return unauthorized();

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const { userId } = payload;
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("User not found!");
      err.status = 404;
      throw err;
    }
    req.user = user;

    if (user.role !== "admin") return forbidden();

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
