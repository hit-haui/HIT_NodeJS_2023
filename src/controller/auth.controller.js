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

module.exports = {
  Register,
};
