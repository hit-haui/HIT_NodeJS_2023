const User = require("../models/user.model")
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
    try {
        const {studentCode, password} = req.body;
        const user = await User.findOne({studentCode});
        if(!user) {
            const err = new Error("classroom not found")
            err.status = 400;
            throw err;
        }
        const isPassword = await bcrypt.compare(password, user, password)
        if(!isPassword) {
            const err = new Error("Student code or password is incorrect!")
            err.status = 400
            throw err;
        }
        res.json({
            message: "Login successfully";
        })
    } catch(err) {
        next(err);
    }
}
