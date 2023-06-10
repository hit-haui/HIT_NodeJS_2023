const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Register = async (req, res, next) => {
  try {
    const { userCode, password, name } = req.body;
    console.log(req.body);
    if (!userCode || !password) {
      const err = new Error("userCode or password is not required");
      err.status = 400;
      throw err;
    }
    const existingUser = await User.findOne({ userCode });
    if (existingUser) {
      const err = new Error("userCode is exist");
      err.status = 400;
      throw err;
    }
    const newUser = await User.create({ userCode, password, name });
    res.status(200).json({
      newUser,
    });
  } catch (err) {
    next(err);
  }
};
const Login = async (req, res, next) => {
  try {
    const { userCode, password } = req.body;
    const user = await User.findOne({ userCode });
    if (!user) {
      const err = new Error("User is not found ");
      err.status = 404;
      throw err;
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      const err = new Error("Password is not true");
      err.status = 400;
      throw err;
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  Register,
  Login,
};
