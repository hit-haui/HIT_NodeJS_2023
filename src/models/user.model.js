const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const saveData = users =>{
  const usersJson = JSON.stringify(users);
  fs.writeFile(path.join(__dirname, "../data/users.json"), usersJson, err => {
    if (err) {
        console.error(err);
    } else {
        console.log("Data has been saved to file");
    }
});
}
class User{
  constructor({id, avatar, fullName, dateOfBirth, password, studentCode, className, schoolYear, clubYear  }){
    this.id = id || uuid.id;
    this.avatar = avatar || null;
    this.fullName = fullName || null;
    this.dateOfBirth = dateOfBirth || null;
    this.password = password || null;
    this.studentCode = studentCode || null;
    this.className = className || null;
    this.schoolYear = schoolYear || null;
    this.clubYear = clubYear || null;

  }
  static getUser() {
    try{
      const usersJson = fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf8");
      const users = JSON.parse(usersJson);
      return users;

    }catch(err) {
      console.log(err);
    }
  }

  static getById(id) {
    const users = User.getUser();
    const user = users.find((user) => user.id === id);
    return user;
  }
  createUser() {
    const users = User.getUser();
    const newUser = this;
    users.push(newUser);
    saveData(users);
  }

  static updateUser(userId, userRaw) {
    const users = User.getUser();
    const index = users.findIndex(user => user.id === userId);
    const newUser = new User(userRaw);
    users.splice(index,1,newUser);
    saveData(users);
  }

  static deleteUser(id) {
    const users = User.getUser();
    const index = users.findIndex(user => user.id === id)
    users.splice(index,1);
    saveData(users);
  }
}

module.exports = User;


