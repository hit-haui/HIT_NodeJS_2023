const fs = require("fs");

const path = require("path");

class User {
  constructor({
    id,
    avatar,
    fullName,
    dateOfBirth,
    password,
    studentCode,
    className,
    schoolYear,
    clubYear,
  }) {
    this.id = id;
    this.avatar = avatar;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.studentCode = studentCode;
    this.password = password;
    this.className = className;
    this.schoolYear = schoolYear;
    this.clubYear = clubYear;
  }

  static find() {
    try {
      const userJson = fs.readFileSync(
        path.join(__dirname, "../data/users.json")
      );
      const users = JSON.parse(userJson);
      return users;
    } catch (err) {
      console.error(err);
    }
  }

  save() {
    const newUser = this;
    const users = User.find();
    users.push({ ...newUser });
    const userJson = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson);
  }

  static findById(id) {
    const user = User.find((user) => user.id === id);
    if (!user) {
      console.log("NOT FOUND");
    } else {
      return user;
    }
  }

  static createUser(data) {
    const newUser = new User(data);
    newUser.save();
    return newUser;
  }

  static updateUser(id, data) {
    const users = User.find();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      console.log("NOT FOUND");
    } else {
      const newUser = new User(data);
      users.splice(index, 1, newUser);
      const userJson = JSON.stringify(users);
      fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson);
      return users;
    }
  }

  static deleteUser(id) {
    const users = User.find();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      console.log("NOT FOUND");
    } else {
      users.splice(index, 1);
      const userJson = JSON.stringify(users);
      fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson);
      return users;
    }
  }
}

module.exports = {
  User,
};
