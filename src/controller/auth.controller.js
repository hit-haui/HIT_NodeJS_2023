const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Register = async (req, res, next) => {
  try {
    const { fullName, studentCode} = req.body;
    let { password } = req.body;
    const checkUser = await User.findOne({ studentCode, password });
    if (checkUser) {
      const err = new Error("User is exist");
      err.status = 400;
      throw err;
    }
    password = await bcrypt.hash(password, 7);
    const newUser = await User.create({
      fullName,
      studentCode,
      password,
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};
const Login = async (req, res, next) => {
  try {
    const { studentCode, password } = req.body;
    const user = await User.findOne({ studentCode });
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      const err = new Error("Student code or password is incorrect");
      err.status = 401;
      throw err;
    }
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { Register, Login };
