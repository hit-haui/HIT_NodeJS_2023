const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const users = require('../data/users.json');
const idSetJson = require('../data/idSet.json')

class User {
    constructor(id, avatar, fullName, dateOfBirth, password, studentCode, className, schoolYear, clubYear) {
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

    static idSet = new Set(idSetJson);

    static getIdSet() {
        return User.idSet;
    }

    static addId(id) {
        User.idSet.add(id);
    }

    static deleteId(id) {
        User.idSet.delete(id);
    }

    static hasId(id) {
        return User.idSet.has(id);
    }

    static generateRandomId() {
        let id;
        do {
            id = crypto.randomBytes(4).toString('hex');
        } while (this.hasId(id));
        this.addId(id);
        return id;
    }

    static saveIdSet() {
        try {
            fs.writeFileSync(path.join(__dirname, '../data/idSet.json'), JSON.stringify([...User.getIdSet()]), "utf8");
            console.log('The idSet.json has been updated successfully !');
        }
        catch (err) {
            console.error(err);
        }
    }

    static saveData() {
        try {
            fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users), "utf8");
            console.log('The users.json has been updated successfully !');
        }
        catch (err) {
            console.error(err);
        }
    }

    static getAllUsers() {
        return users;
    }

    static getById(id) {
        const users = User.getAllUsers();
        var user = users.find((item) => item.id == id);
        return user;
    }
}

module.exports = User;