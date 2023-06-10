const User = require("../models/blog.model");
const Register = async (req, res, next) => {
  try {
    const { userCode, password, name } = req.body;
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

module.exports = {
  Register,
};
