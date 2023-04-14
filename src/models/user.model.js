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

  save() {
    const newUser = this;
    const users = User.find();
    console.log(users);
    // convert instance class to object
    users.push({ ...newUser });
    const usersJSON = JSON.stringify(users);
    // write file
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersJSON);
    console.log(usersJSON);
  }

  static find() {
    try {
      const usersJSON = fs.readFileSync(
        path.join(__dirname, "../data/users.json"),
        "utf8"
      );
      const users = JSON.parse(usersJSON);
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  static findById(id) {
    let users = User.find();
    users = users.filter((user) => user.id == id);
    return users;
  }

  static deleteById(id) {
    let users = User.findById();
    users = User.filter((user) => user.id != id);
    users.save();
  }

  static updateById(id, newUser) {
    let users = User.findById();
    users = users.map((user) => {
      if (user.id == id) {
        return newUser;
      }
      return user;
    });
    users.save();
  }
}

module.exports = User;

// encoding
