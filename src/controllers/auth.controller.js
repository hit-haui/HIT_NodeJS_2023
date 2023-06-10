const User = require("../models/user.model");

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

module.exports = register;
