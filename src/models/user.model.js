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
        path.join(__dirname, "../data/users.json")
      );

      //convert json to js
      const users = JSON.parse(usersJson);
      return users;
    } catch (err) {
      console.error(err);
    }
  }

  static findUserById(userId) {
    const users = User.find();
    const user = users.findIndex((item) => String(item.userId) === userId);
    if (!user) {
      return "Not found";
    } else {
      return user;
    }
  }

  static update(userId, newUser) {
    const users = User.find();
    const index = User.findUserById(userId);
    console.log(index);
    if (index == -1) {
      return "not found";
    } else {
      const newUsers = new User(newUser);
      users.splice(index, 1, newUsers);
      const usersJson = JSON.stringify(users);
      fs.writeFileSync(
        path.join(__dirname, "../data/users.json"),
        usersJson,
        (err) => {
          if (err) {
            console.log(err);
          } else {
            return usersJson;
          }
        }
      );
    }
  }

  static delete(userId) {
    const users = User.find();
    const index = User.findUserById(userId);
    console.log(index);
    if (index == -1) {
      return "not found";
    } else {
      users.splice(index, 1);
      const usersJson = JSON.stringify(users);
      fs.writeFileSync(
        path.join(__dirname, "../data/users.json"),
        usersJson,
        (err) => {
          if (err) {
            console.log(err);
          } else {
            return usersJson;
          }
        }
      );
    }
  }
}

module.exports = User;
