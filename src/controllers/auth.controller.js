const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  const { name, password, userCode } = req.body;
  try {
    if (!userCode) {
      const err = new Error("User code is required!");
      err.status = 400;
      throw err;
    }
    const checkUser = await User.findOne({ userCode });
    if (checkUser) {
      const err = new Error("User code is exit!");
      err.status = 400;
      throw err;
    }
    const user = await User.create({ name, password, userCode });
    res.status(201).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { userCode, password } = req.body;
    const user = await User.findOne({ userCode });
    if (!user) {
      const err = new Error("userCode or password is incorrect");
      err.status = 400;
      throw err;
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      const err = new Error("User code or password is incorrect!");
      err.status = 400;
      throw err;
    }

    const token = await jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY
    );
    res.status(200).json({
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
