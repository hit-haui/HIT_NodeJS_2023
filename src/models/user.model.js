const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    avatar: {
      type: String,
      default: "https://static.dhcnhn.vn/student",
    },
    fullName: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: "01-01-1970",
    },
    password: {
      type: String,
      default: function () {
        return this.studentCode + "@17";
      },
    },
    studentCode: {
      type: Number,
      required: true,
    },
    className: {
      type: String,
      default: null,
    },
    schoolYear: {
      type: Number,
      default: null,
    },
    clubYear: {
      type: Number,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  } catch (err) {
    next(err);
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
