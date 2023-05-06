const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    avatar: String,
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: Date,
    password: String,
    studentCode: {
      type: String,
      required: true,
    },
    className: String,
    schoolYear: String,
    clubYear: String,
  },

  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
