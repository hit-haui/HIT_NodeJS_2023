const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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

module.exports = {
    register,
}
