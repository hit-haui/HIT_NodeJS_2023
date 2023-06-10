const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    const { avatar, fullName, email } = req.body;
    let { password } = req.body;

    try {
        if (!email || !password) {
            const err = new Error('Email or password is required!');
            err.status = 400;
            throw err;
        }

        const isUserExists = await User.exists({ email });
        if (isUserExists) {
            const err = new Error('User is exists!');
            err.status = 400;
            throw err
        }

        password = await bcrypt.hash(password, 7);

        const user = await User.create({ avatar, fullName, email, password });

        res.status(201).json({
            user
        });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error('User not found!');
            err.status = 404;
            throw err;
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            const err = new Error('Password is incorrect!');
            err.status = 401;
            throw err;
        }

        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.status(200).json({
            token
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
}
