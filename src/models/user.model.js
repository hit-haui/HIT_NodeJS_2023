const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://static.dhcnhn.vn/student",
    },
    fullName: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: "01-01-1970",
    },
    age: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// firstName
// lastName
// fullName = this.firstName + ' ' + this.lastName
userSchema.virtual("information").get(function () {
  return this.fullName + " - NodeJS";
});

userSchema.method("getFullName", function () {
  return this.firstName + " " + this.lastName;
});

// method
userSchema.method("getAge", function () {
  var currentDate = new Date();
  var birthDate = new Date(this.dateOfBirth);

  var age = currentDate.getFullYear() - birthDate.getFullYear();
  var monthDiff = currentDate.getMonth() - birthDate.getMonth();
  var dayDiff = currentDate.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  this.age = age;
});

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 7);
    }
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
