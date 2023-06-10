const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    studentCode: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      default: function () {
        return this.studentCode + "@17";
      },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
