const User = require("../models/users.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


const Register = async (req, res, next) => {
  try {
    const { avatar, name, birth, password } = req.body;
    if (!name) {
      const err = new Error("Name is required!");
      err.status = 400;
      throw err;
    }
    const checkUser = await User.findOne({ name });
    if (checkUser) {
      const err = new Error("Author is exist");
      err.status = 400;
      throw err;
    }
    const newUser = User.create({ avatar, name, birth, password });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const Login = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    if (!password) {
      const err = new Error("Password is required!");
      err.status = 400;
      throw err;
    }
    const checkUser = await User.findOne({ name });
    const isPassword = await bcrypt.compare(password, checkUser.password);
    if (!isPassword) {
      const err = new Error("Username or Password is incorrect");
      err.status(401);
      throw err;
    }
    const token = await jwt.sign(
      { name: checkUser.name },
      process.env.PRIVATE_KEY,
      { expiresIn: process.env.DATE_OF_TOKEN }
    );
    res.status(200).json({
      message: "Login successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  Register,
  Login,
};
