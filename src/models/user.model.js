const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    fullName: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    password: {
      type: String,
    },
    studentCode: {
      type: String,
    },
    className: {
      type: String,
    },
    schoolYear: {
      type: String,
    },
    clubYear: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
