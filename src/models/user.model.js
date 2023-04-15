const fs = require("fs");
const path = require("path");
const uuid = require('uuid');

// save data
const saveData = users => {
    const usersJson = JSON.stringify(users);
    fs.writeFile(path.join(__dirname, "../data/users.json"), usersJson, err => {
        if (err) {
            console.error(err);
        } else {
            console.log("Data has been saved to file");
        }
    });
};

class User {
    constructor({ id, avatar, fullName, dateOfBirth, password, studentCode, className, schoolYear, clubYear }) {
        this.id = id || uuid.v4();
        this.avatar = avatar || null;
        this.fullName = fullName || null;
        this.dateOfBirth = dateOfBirth || null;
        this.password = password || null;
        this.studentCode = studentCode || null;
        this.className = className || null;
        this.schoolYear = schoolYear || null;
        this.clubYear = clubYear || null;
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

    // find user by id
    static findUserByID(userId) {
        const users = User.getAllUser();
        const user = users.filter(user => user.id === userId);
        return user[0];
    }

    // add new user
    addUser() {
        const users = User.getAllUser();
        const newUser = this;
        users.push(newUser);
        saveData(users);
    }

    // update user
    static updateUser(userId, userRaw) {
        const users = User.getAllUser();
        const index = users.findIndex(user => user.id === userId);
        const user = users[index];
        const updatedUser = Object.assign({}, user, userRaw);
        users[index] = updatedUser;
        saveData(users);
    }

    // delete user
    static deleteUser(userId) {
        const users = User.getAllUser();
        const deletedUsers = users.filter(user => user.id !== userId);
        saveData(deletedUsers);
    }
}

module.exports = User;