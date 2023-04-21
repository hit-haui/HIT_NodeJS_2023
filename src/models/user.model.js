const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    avatar: String,
    fullName: String,
    dataOfBirth: String,
    password: String,
    studentCode: String,
    className: String,
    schoolYear: Number,
    clubYear: Number
},
{
    timestamps: true
}
);

const users = mongoose.model('users', userSchema);

module.exports = users;