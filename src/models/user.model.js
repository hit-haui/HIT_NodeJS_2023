const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    role: {
      type: String,
      required: [true, "Please provide your role!"],
    },
    age: Number,
    email: String,
    password: {
      type: String,
      required: [true, "Please provide your password!"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
