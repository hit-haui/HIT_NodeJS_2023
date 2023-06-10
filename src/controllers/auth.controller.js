const bcrypt = require("bcrypt");
const User = require("../models/user.model");

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

module.exports = register;
