const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { role, password, email } = req.body;

  try {
    if (!role || !password) {
      const err = new Error("Role or password is required!");
      err.status = 400;
      throw err;
    }

    const isUserExists = await User.exists({ email });
    if (isUserExists) {
      const err = new Error("User is exists!");
      err.status = 400;
      throw err;
    }

    const user = User.create({ role, password, email });

    res.status(201).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      const err = new Error("Password is required!");
      err.status = 400;
      throw err;
    }

    const isPassword = await bcrypt.compare(password, user.password);
    console.log(password, user.password);
    if (!isPassword) {
      const err = new Error("Password is incorrect!");
      err.status = 401;
      throw err;
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  register,
  login,
};
