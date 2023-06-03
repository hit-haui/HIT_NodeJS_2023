const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userCode: {
            type: Number,
            required: true
        },
        avatar: {
            type: String,
            default: "https://static.dhcnhn.vn/student"
        },
        fullName: {
            type: String,
            default: null
        },
        dateOfBirth: {
            type: Date,
            default: "01-01-1970"
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;