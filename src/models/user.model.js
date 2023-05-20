const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        avatar: {
            type: String,
            default: "/images/avatar-default.png"
        },
        fullName: String,
        dateOfBirth: {
            type: Date,
            default: "01-01-1970"
        },
        password: {
            type: String,
            require: true,
        },
        studentCode: {
            type: Number,
            required: true,
        },
        className: String,
        schoolYear: Number,
        clubYear: Number,
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    const user = this;

    try {
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 7);
        }

        next();
    } catch (error) {
        next(error);
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;
