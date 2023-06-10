const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      const err = new Error("Unauthorized!");
      err.status = 401;
      throw err;
    }
    const token = authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log(payload);

    const name = payload.name;

    const user = await User.findOne({ name });
    if (!user || user.role !== "admin") {
      const err = new Error("Unauthorized");
      err.status = 401;
      throw err;
    }
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

module.exports = authMiddleware;
