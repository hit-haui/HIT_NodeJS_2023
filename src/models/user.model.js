const fs = require("fs");
const path = require("path");

const saveData = (users) => {
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
};
class User {
  constructor({
    userId,
    avatar,
    fullName,
    dataOfBirth,
    passWord,
    studentCode,
    className,
    schoolYear,
    clubYear,
  }) {
    this.userId = userId || uuid.userId;
    this.avatar = avatar;
    this.fullName = fullName;
    this.dataOfBirth = dataOfBirth || null;
    this.passWord = passWord || null;
    this.studentCode = studentCode;
    this.className = className;
    this.schoolYear = schoolYear;
    this.clubYear = clubYear;
  }

  createUser() {
    console.log(this);
    const users = User.find();
    //push element to ar
    users.push({ ...this });
    saveData(users);
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
    const user = users.find((user) => String(user.userId) === userId);
    return user;
  }

  static update(userId, newUser) {
    const users = User.find();
    const index = users.findIndex((user) => String(user.userId) === userId);
    const newUsers = new User(newUser);
    users.splice(index, 1, newUsers);
    saveData(users);
  }

  static delete(userId) {
    const users = User.find();
    const index = users.findIndex((user) => String(user.userId) === userId);
    users.splice(index, 1);
    saveData(users);
  }
}

module.exports = User;
