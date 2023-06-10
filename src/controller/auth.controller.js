const User = require("../model/user.model");
const bcrypt = require("bcrypt")
const Register = async (req, res, next) => {
  try {
    const { fullName, studentCode,role } = req.body;
    let{password}= req.body;
    const checkUser = await User.findOne({ studentCode,password });
    if (checkUser) {
      const err = new Error("User is exist");
      err.status = 400
      throw err;
    }
    password =await bcrypt.hash(password, 7);
    const newUser = await User.create({
      fullName,
      studentCode,
      password,
      role,
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};
module.exports = {Register};
