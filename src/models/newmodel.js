const users = require("../data/users.json");

const fs = require("fs");

const path = require("path");

class Users {
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
    this.password = password;
    this.studentCode = studentCode;
    this.className = className;
    this.schoolYear = schoolYear;
    this.clubYear = clubYear;
  }

  static find() {
    try {
      const data = fs.readFileSync(path.join(__dirname, "../data/users.json"), {
        encoding: "utf8",
        flag: "r",
      });
      const users = JSON.parse(data);
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  saveNewUser() {
    fs.writeFileSync(
      path.join(__dirname, "../data/users.json"),
      JSON.stringify(users),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Success");
        }
      }
    );
  }

  save() {
    users.push(this);
    this.saveNewUser(users);
  }

  static getUserById(id) {
    const users = Users.find();
    const user = users.find((item) => item.id == id);
    if (!user) {
      return "Not found";
    } else {
      return user;
    }
  }

  static createUser(data) {
    const newUser = new Users(data);
    newUser.save();
    return newUser;
  }

  static updateUserById(id, data) {
    const users = Users.find();
    const index = users.findIndex((item) => item.id == id);
    console.log(index);
    if (index == -1) {
      return "Not found user to update";
    } else {
      const newUser = new Users(data);
      users.splice(index, 1, newUser);
      fs.writeFile(
        path.join(__dirname, "../data/users.json"),
        JSON.stringify(users),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Success");
            return users;
          }
        }
      );
    }
  }

  static deleteUserById(id) {
    const users = Users.find();
    const index = users.findIndex((item) => item.id == id);
    if (index == -1) {
      return "Not found";
    } else {
      users.splice(index, 1);
      fs.writeFile(
        path.join(__dirname, "../data/users.json"),
        JSON.stringify(users),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            return users;
          }
        }
      );
    }
  }
}

module.exports = Users;
