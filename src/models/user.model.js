const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  avatar: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  dateOfBirth: {
    type: String,
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
  className: {
    type: String,
    require: true,
  },
  schoolYear: {
    type: String,
    require: true,
  },
  clubYear: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
