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

  createUser() {
    const newUser = this;
    const users = User.find();
    // convert instance class to object
    users.push({ ...newUser });

    User.saveFile(users);
  }

  static saveFile(users) {
    const usersJSON = JSON.stringify(users);
    fs.writeFile(
      path.join(__dirname, "../data/users.json"),
      usersJSON,
      "utf8",
      (error) => {
        if (error) throw error;
        console.log("Write successfully !!!");
      }
    );
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
    const users = User.find();
    const user = users.find((user) => user.id === id);
    return user;
  }

  static deleteById(id) {
    const users = User.find();
    const filteredUsers = users.filter((user) => user.id !== id);
    if (filteredUsers.length === users.length) {
      throw new Error(`Cannot find user with id ${id}`);
    }
    User.saveFile(filteredUsers);
    const deletedUser = users.find((user) => user.id === id);
    return deletedUser;
  }

  static updateById(id, updateData) {
    let users = User.find();
    let isUserExists = false;
    users = users.map((user) => {
      if (user.id === id) {
        isUserExists = true;
        return updateData;
      }
      return user;
    });
    console.log(users);
    if (!isUserExists) {
      throw new Error(`User with id ${id} not found`);
    }
    User.saveFile(users);
    return updateData;
  }
}

module.exports = User;
