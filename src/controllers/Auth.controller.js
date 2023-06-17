const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { name, userCode, password } = req.body;
  try {
    if (!name || !password) {
      const err = new Error("Name or password is required");
      err.status = 400;
      throw err;
    }
    const existingUser = await User.findOne({ userCode });
    if (existingUser) {
      const err = new Error("User is exist");
      err.status = 400;
      throw err;
    }
    const newUser = await User.create({ name, userCode, password });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { password, userCode } = req.body;
  try {
    if (!password) {
      const err = new Error("Password is required");
      err.status = 400;
      throw err;
    }
    const existingUser = await User.findOne({ userCode });
    if (!existingUser) {
      const err = new Error("User is not exist");
      err.status = 400;
      throw err;
    }
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      const err = new Error("password is incorrect!");
      err.status = 401;
      throw err;
    }
    const token = await jwt.sign(
      { userId: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  login,
};
