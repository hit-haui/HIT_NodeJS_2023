const data = require("../data/users.json");
const User = require('../models/user.model');

const getUserByStudentCode = (req, res) => {
    const users = data;
    const user = users.find(item => item.studentCode == req.params.studentCode);
    if(user) {
        res.json({
            user: user
        })
    }
    else {
        res.json({
            msg: "User not found"
        })
    }
}

const getUser = (req, res) => {
    const users = User.find();
    res.json({
        users
    })
}

const createUser = (req, res) => {
    const user = new User({
        avatar: req.body.avatar,
        fullName: req.body.fullName,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        studentCode: req.body.studentCode,
        className: req.body.className,
        schoolYear: req.body.schoolYear,
        clubYear: req.body.clubYear,
    })
    user.save();

    res.json({
        msg: "Success"
    })
}

const deleteUserBystudentCode = (req, res) => {
    const {studentCode} = req.params;
    let users = data;
    users = users.filter((item, id) => item.studentCode != studentCode);
    res.json({
        users,
    })
}

const updateUserByStudentCode = (req, res) => {
    let users = data;
    const {studentCode} = req.params;
    const newUser = req.body;
    users = users.map((item, id) => {
        if(item.studentCode == studentCode) return newUser;
        else return item;
    });
    res.json({
        users: users
    })
}

module.exports = {
    getUser,
    getUserByStudentCode,
    createUser,
    deleteUserBystudentCode,
    updateUserByStudentCode
}