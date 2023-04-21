const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
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
      type: Number,
      require: true,
    },
    className: {
      type: String,
      require: true,
    },
    schoolYear: {
      type: Number,
      require: true,
    },
    clubYear: Number,
  },
  {
    versionKey: false,
  }
)

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
