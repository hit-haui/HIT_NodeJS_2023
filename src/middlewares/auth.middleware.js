const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const unauthozied = () => {
  const error = new Error("Unauthozied!!");
  error.status = 401;
  throw error;
};

const forbidden = () => {
  const error = new Error("Forbidden!!");
  error.status = 403;
  throw error;
};

const extractTokenFromHeader = (request) => {
  const [type, accessToken] = request.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? accessToken : undefined;
};

const authMiddleware = async (req, res, next) => {
  const accessToken = extractTokenFromHeader(req);
  if (!accessToken) unauthozied();

  try {
    const payload = jwt.verify(accessToken, process.env.SECRET_KEY);
    const { userId } = payload;
    const user = await User.findById(userId);
    if (!user) return unauthozied();

    if (user.role !== "admin") return forbidden();

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
