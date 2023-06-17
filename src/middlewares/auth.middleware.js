const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const unauthentication = () => {
  const error = new Error("unauthentication!!");
  error.status = 401;
  throw error;
};

const extractTokenFromHeader = (request) => {
  const [type, accessToken] = request.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? accessToken : undefined;
};

const authMiddleware = async (req, res, next) => {
  const accessToken = extractTokenFromHeader(req);
  if (!accessToken) unauthentication();

  try {
    const payload = jwt.verify(accessToken, process.env.SECRET_KEY);
    const { userId } = payload;
    const user = await User.findById(userId);
    if (!user) return unauthentication();

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
