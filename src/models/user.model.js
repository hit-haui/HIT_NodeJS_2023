const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    avatar: String,
    fullName: String,
    dateOfBirth: String,
    password: String,
    studentCode: String,
    className: String,
    schoolYear: Number,
    clubYear: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;
