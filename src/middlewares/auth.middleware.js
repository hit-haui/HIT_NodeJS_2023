const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const extractTokenFromHeader = (request) => {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}

const unauthorized = () => {
    const err = new Error("Unauthorized!");
    err.status = 401;
    throw err;
};

const authMiddleware = async (req, res, next) => {
  try {
      const token = extractTokenFromHeader(req)
      if (!token) return unauthorized();

      // verify token
      const payload = jwt.verify(token, process.env.SECRET_KEY);

      // check user
      const userId = payload.userId;
      const user = await User.findById(userId);
      if (!user) return unauthorized();

      // check permission
      if (user.role !== 'admin') return unauthorized();
      next();
  } catch (err) {
      err.status = 401;
      next(err);
  }
    
}

module.exports = authMiddleware;
