const fs = require('fs');
const path = require('path');

class User {
    constructor({ id, avatar, fullName, dateOfBirth, password, studentCode, className, schoolYear, clubYear }) {
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
            const rawUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf8');
            const users = JSON.parse(rawUsers);
            return users;
        } catch (err) {
            console.log(err.message);
        }
    }

    static save(users) {
        const rawUsers = JSON.stringify(users);
        fs.writeFile(path.join(__dirname, '../data/users.json'), rawUsers, (err) => {
            if (err) throw err;
            console.log('Write file successfully');
        });
    }

    static getById(id) {
        const users = User.find();
        return users.find(user => user.id == id);
    }

    add() {
        const users = User.find();
        users.push({ ...this });

        User.save(users);
    }

    static updateById(id, update) {
        const users = User.find();
        const updatedUsers = users.map(user => {
            if (user.id == id) {
                return {
                    ...user,
                    ...update
                }
            }
            return user;
        });

        User.save(updatedUsers);
    }

    static deleteById(id) {
        const users = User.find();
        const deletedUsers = users.filter(user => user.id != id);

        User.save(deletedUsers);
    }
}

module.exports = User;