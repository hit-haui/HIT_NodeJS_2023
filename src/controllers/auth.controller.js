const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const Joi = require("joi");

const Register = async (req, res, next) => {
  // validation:
  // + express-validation
  // + class-validator
  // + joi

  // const schema = Joi.object({
  //   avatar: Joi.string(),
  //   fullName: Joi.string().min(3).max(30),
  //   dateOfBirth: Joi.string(),
  //   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  //   studentCode: Joi.number().required(),
  //   className: Joi.string(),
  //   schoolYear: Joi.number(),
  //   clubYear: Joi.number(),
  //   role: Joi.string(),
  // });

  try {
    // const { error, value } = schema.validate(req.body);
    // if (error) {
    //   // const err = new Error("Bad request");
    //   // err.status = 400
    //   throw error;
    // }
    //

    // Upload
    // Formidable, Busboy, Multer and Multiparty for processing file uploads
    const avatar = req.file.path;
    const { fullName, studentCode, password } = req.body;

    const checkUser = await User.findOne({ studentCode });
    if (checkUser) {
      const err = new Error("Student is exist");
      // err.status = 400
      throw err;
    }
    const newUser = await User.create({
      fullName,
      studentCode,
      password,
      avatar,
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const Login = async (req, res, next) => {
  try {
    const { studentCode, password } = req.body;
    const user = await User.findOne({ studentCode });
    if (!user) {
      const err = new Error("Student code or password is incorrect");
      err.status = 401;
      throw err;
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      const err = new Error("Password is incorrect");
      err.status = 401;
      throw err;
    }
    const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY);
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
