const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  } catch (err) {
    next(err);
  }

  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
