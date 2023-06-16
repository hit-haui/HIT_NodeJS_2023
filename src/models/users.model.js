const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    avatar: {
      type: String,
      default: "https://static.dhcnhn.vn/student",
    },
    name: {
      type: String,
      default: null,
    },
    birth: {
      type: String,
      default: "01-01-1900",
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "author",
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
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
