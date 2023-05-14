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
            err.status = 400;
            throw err;
        }

        const token = await jwt.sign(
            {
                userId: user.id
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            message: 'Login successful!',
            token
        })
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login
};
