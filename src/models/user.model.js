const fs = require("fs");
const path = require("path");
const { use } = require("../routes/user.route");

class User {
  constructor({
    id,
    avatar,
    fullName,
    dataOfBirth,
    passWord,
    studentCode,
    className,
    schoolYear,
    clubYear,
  }) {
    this.id = id;
    this.avatar = avatar;
    this.fullName = fullName;
    this.dataOfBirth = dataOfBirth;
    this.passWord = passWord;
    this.studentCode = studentCode;
    this.className = className;
    this.schoolYear = schoolYear;
    this.clubYear = clubYear;
  }

  save() {
    console.log(this);
    const users = User.find();
    //push element to ar
    users.push({ ...this });
    //convert instance class to object
    const usersJson = JSON.stringify(users);
    console.log(users);
    fs.writeFileSync(
      //write file
      path.join(__dirname, "../data/users.json"),
      usersJson
    );
  }

  static find() {
    try {
      //read file
      const usersJson = fs.readFileSync(
        path.join(__dirname, "../data/users.json"),
        { encoding: "utf8", flag: "r" }
      );
      // console.log(usersJson);
      //convert json to js
      const users = JSON.parse(usersJson);
      return users;
    } catch (err) {
      console.error(err);
    }
  }

  static delete(userId) {
    const index = users.findIndex((user) => user.userId == userId);
    if (index == -1) {
      console.log("not found");
      return;
    }
    users.splice(index, 1);
    save(users);
  }
}

module.exports = User;
