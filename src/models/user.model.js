const { log } = require("console");
const fs = require("fs");
const path = require("path");
const allUsers = require("../data/users.json");

class user {
  constructor(
    id,
    avatar,
    fullName,
    dateOfBirth,
    password,
    studentCode,
    className,
    schoolYear,
    clubYear
  ) {
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
      console.log(__dirname);
      const productJson = fs.readFileSync(
        path.join(__dirname, "../data/.json"),
        "utf-8"
      );

      const products = JSON.parse(productJson); //convert JSON to JS

      console.log(productJson);
      return products;
    } catch (err) {
      console.error(err);
    }
  }

  static save() {
    try {
      fs.writeFileSync(
        path.join(__dirname, "../data/users.json"),
        JSON.stringify(allUsers),
        "utf8"
      );
      console.log("The users.json has been updated successfully !");
    } catch (err) {
      console.error(err);
    }
  }

  static getAllUser() {
    return allUsers;
  }

  static findById(id) {
    let findUser = allUsers.find((item) => item.id == id);

    return findUser;
  }
}

module.exports = user;
