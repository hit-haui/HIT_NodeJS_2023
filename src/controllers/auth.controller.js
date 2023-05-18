const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    try {
        const { studentCode, password } = req.body;
        const user = await User.findOne({ studentCode });
        const isPassword = await bcrypt.compare(password, user.password);
        if (!user || !isPassword) {
            const err = new Error("Student code or password is incorrect!");
            err.status = 401;
            throw err;
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({
            message: "Login successfully!",
            token,
        });
    } catch (err) {
        next(err);
    }
};

const register = async (req, res, next) => {
    const { fullName, password, studentCode } = req.body;
    try {
        if (!studentCode) {
            const err = new Error("Student code is required!");
            err.status = 400;
            throw err;
        }
        const checkUser = await User.findOne({ studentCode: studentCode});
        if (checkUser) {
            const err = new Error("Student code is exit!");
            err.status = 400;
            throw err;
        }
        const user = await User.create({ fullName, password, studentCode });
        res.status(201).json({
            user
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
   login,
   register
};
