const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    role: {
      type: String,
      defaut: "user",
      enum: ["admin", "user"],
    },
    age: Number,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, "Please provide your password!"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 7);
    }

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
