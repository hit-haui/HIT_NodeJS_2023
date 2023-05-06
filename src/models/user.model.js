const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
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
        password: {
            type: String,
            default: function () {
                return this.studentCode + "@17"
            }
        },
        studentCode: {
            type: Number,
            required: true,
        },
        className: {
            type: String,
            default: null
        },
        schoolYear: {
            type: Number,
            default: null
        },
        clubYear: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
