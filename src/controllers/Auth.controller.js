const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { name, userCode, password } = req.body;
  try {
    if (!name || !password) {
      const err = new Error("Name or password is require");
      err.status = 400;
      throw err;
    }
    const existingUser = await User.findOne({userCode});
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

module.exports = {
  register,
};
