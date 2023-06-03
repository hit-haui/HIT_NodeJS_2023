const mongoose = require("mongoose");

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
    role: {
      type: String,
      default: "author",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
