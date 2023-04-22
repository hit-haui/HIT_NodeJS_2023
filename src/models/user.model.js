const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    avatar: String,
    fullName: {
      type: String,
      require: true,
    },
    dateOfBirth: {
      type: Date,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    studentCode: {
      type: String,
      require: true,
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
