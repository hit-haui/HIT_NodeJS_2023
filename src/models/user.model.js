const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    avatar: String,
    fullName: String,
    dateOfBirth: String,
    password: { type: String, required: true },
    studentCode: { type: Number, required: true },
    className: String,
    schoolYear: Number,
    clubYear: Number,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
