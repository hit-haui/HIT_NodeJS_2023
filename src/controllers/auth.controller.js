const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const login = async (req, res, next) => {
    const { studentCode, password } = req.body;

    try {
        const user = await User.findOne({ studentCode });
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

        const token = await jwt.sign(
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
    } catch (err) {
        next(err);
    }
};

const register = async (req, res, next) => {
    const {
        fullName,
        dateOfBirth,
        password,
        studentCode,
        className,
        schoolYear,
        clubYear
    } = req.body;

    try {
        if (!studentCode || !password) {
            const err = new Error('Student code or password is required!');
            err.status = 400;
            throw err;
        }

        const isUserExists = await User.exists({ studentCode });
        if (isUserExists) {
            const err = new Error('Student is exists!');
            err.status = 400;
            throw err
        }

        const user = await User.create({
            fullName,
            dateOfBirth,
            password,
            studentCode,
            className,
            schoolYear,
            clubYear
        });

        res.status(201).json({
            user
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    register,
};
