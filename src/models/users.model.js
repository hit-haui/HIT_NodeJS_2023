const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    avatar:{
        type: String,
        require: true,
    },
    fullName: {
        type: String,
        default: null
    },
    dateOfBirth: {
        type: Date,
        require: true,
    },
    password: {
        type: String,
        default: null
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
    clubYear:{
        type: Number,
        require: true
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;