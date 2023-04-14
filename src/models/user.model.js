const fs = require("fs");
const path = require("path");
let users = require("../data/users.json");
class User {
  constructor({
    id,
    avatar,
    fullName,
    dataOfBirth,
    password,
    studentCode,
    className,
    schoolYear,
    clubYear,
  }) {
    this.id = id;
    this.avatar = avatar;
    this.fullName = fullName;
    this.dataOfBirth = dataOfBirth;
    this.password = password;
    this.studentCode = studentCode;
    this.className = className;
    this.schoolYear = schoolYear;
    this.clubYear = clubYear;
  }

  save() {
    const newProduct = this;
    const users = User.find();
    // convert instance class to object
    users.push(newProduct);
    // Javascript to Json
    const usersJson = JSON.stringify(users);
    // Write file
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersJson);
  }
  static getByPassWord(id) {
    const user = users.find((item) => item.password == password);
    return user;
  }
  static deleteByPass(id) {
    const index = users.findIndex((user) => user.password == userPassword);
    users.splice(index, 1);
    // const users = User.find();

    users.save();
  }
  static find() {
    try {
      const usersJson = fs.readFileSync(
        path.join(__dirname, "../data/users.json"),
        "utf8"
      );
      //convert json to javascript
      const users = JSON.parse(usersJson);
      return users;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = User;
