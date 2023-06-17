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
    if(!token){
      const err = new Error("Token is not exist");
      err.status = 401;
      throw err;
    }
    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userID = payload.userId;
    const user = await User.findById(userID);
    if (!user) {
      const err = new Error("User not found");
      err.status = 401;
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
