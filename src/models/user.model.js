const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  avatar: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentCode: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  schoolYear: {
    type:String,
    required: true,
  },
  clubYear: {
    type: String,
    required: true,
  },
});
// để tên tự đông thành users
const User = mongoose.model("User",userSchema);
module.exports = User;
