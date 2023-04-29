const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    avatar: String,
    fullName: {
      type: String,
      require: true,
    },
    dateOfBirth: String,
    password: {
      type: String,
      require: true,
    },
    studentCode: {
      type: Number,
      require: true,
    },
    className: String,
    schoolYear: Number,
    clubYear: Number,
  },
  {
    versionKey: false,
  }
)

const Users = mongoose.model('User', userSchema)

module.exports = Users
