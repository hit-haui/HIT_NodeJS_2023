const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { studentCode, password } = req.body;
    const user = await User.findOne({ studentCode });
    if (!user) {
      const err = new Error("Student code is incorrect!");
      err.status = 401;
      throw err;
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      const err = new Error("Studen code or password is incorrect!");
      err.status = 401;
      throw err;
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const { fullName, password, studentCode } = req.body;
  try {
    if (!studentCode) {
      const err = new Error("Student code is required!");
      err.status = 400;
      throw err;
    }
    const existingUser = await User.findOne({ studentCode });
    if (existingUser) {
      const err = new Error("User already exists!");
      err.status = 400;
      throw err;
    }
    User.create({ fullName, password, studentCode, schoolYear });
    res.status(201).json({ message: "register successfully!" });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register };
