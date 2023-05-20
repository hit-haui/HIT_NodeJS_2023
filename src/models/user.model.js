const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
      user.password = await bcrypt.hash(user.password, 7);
    }
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
