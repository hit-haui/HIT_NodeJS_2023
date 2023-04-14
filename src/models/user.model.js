const fs = require("fs");
const path = require("path");

class User {
  constructor({ avatar, fullName, dateOfBirth, password, studentCode, className, schoolYear, clubYear}) {
    this.avatar = avatar;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.password = password;
    this.studentCode = studentCode;
    this.className = className;
    this.schoolYear = schoolYear;
    this.clubYear = clubYear;
  }

  save() {
    const newUser = this;
    const users = User.find();
    // convert instance class to object
    users.push(newUser);
    // Javascript to Json
    const usersJson = JSON.stringify(users);
    // Write file
    fs.writeFileSync(
      path.join(__dirname, "../data/users.json"),
      usersJson
    );
  }

  static find() {
    try {
      //   read file users.json
      const usersJson = fs.readFileSync(
        path.join(__dirname, "../data/users.json"),
        "utf8"
      );
      //   convert json to javascript
      const users = JSON.parse(usersJson);
      return users;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = User;
