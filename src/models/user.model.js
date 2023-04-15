const fs = require("fs");
const path = require("path");
const uuid = require('uuid');

// save data
const saveData = users => {
    usersJson = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersJson);
}

class User {
    constructor({ id, avatar, fullName, dateOfBirth, password, studentCode, className, schoolYear, clubYear }) {
        this.id = id || uuid.v4();
        this.avatar = avatar || "null";
        this.fullName = fullName || "null";
        this.dateOfBirth = dateOfBirth || "null";
        this.password = password || "null";
        this.studentCode = studentCode || "null";
        this.className = className || "null";
        this.schoolYear = schoolYear || "null";
        this.clubYear = clubYear || "null";
    }

    // get all user
    static getAllUser() {
        try {
            const usersJson = fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8");
            const users = JSON.parse(usersJson);
            return users;
        } catch (err) {
            console.log(err);
        }
    }

    // find index by id
    static findIndexById(userId) {
        const users = User.getAllUser();
        const index = users.findIndex(user => user.id === userId);
        return index;
    }

    // get user by index
    static getUserByIndex(index) {
        const users = User.getAllUser();
        const user = users[index];
        return user;
    }

    // add new user
    addUser() {
        const users = User.getAllUser();
        const newUser = this;
        users.push(newUser);
        saveData(users);
    }

    // update user
    static updateUser(index, userRaw) {
        const users = User.getAllUser();
        const user = users[index];
        const updatedUser = Object.assign({}, user, userRaw);
        users[index] = updatedUser;
        saveData(users);
    }

    // delete user
    static deleteUser(index) {
        const users = User.getAllUser();
        users.splice(index, 1);
        saveData(users);
    }
}

module.exports = User;