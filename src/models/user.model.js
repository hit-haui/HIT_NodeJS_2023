const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const brcypt = require("bcrypt");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userCode: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await brcypt.hash(user.password, 7);
    }
    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
