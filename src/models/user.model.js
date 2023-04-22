const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    avatar: String,
    fullName: String,
    dateOfBirth: Date,
    password: String,
    studentCode: String,
    className: String,
    schoolYear: Number,
    clubYear: Number,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;

