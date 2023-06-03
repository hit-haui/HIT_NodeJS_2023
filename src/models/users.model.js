const mongoose = require("mongoose");

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
      default: "01-01-1900",
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
