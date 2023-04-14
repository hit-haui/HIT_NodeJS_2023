const users = require("../data/users.json");

const fs = require("fs");

const path = require("path");

class Users {
    constructor({id , avatar, fullName, dateOfBirth, password, studentCode, className, schoolYear, clubYear}){
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
            const data = fs.readFileSync(path.join(__dirname,'../data/users.json'), {encoding: 'utf8', flag: 'r'});
            const users = JSON.parse(data);
            return users;
        } catch(err) {
            console.log(err);
        }
    }

    saveNewUser() {
        fs.writeFileSync(path.join(__dirname,'../data/users.json'), JSON.stringify(users), (err) => {
            if(err){
                console.log(err);
            } else {
                console.log('Success');
            }
        })
    }

    save() {
        users.push(this);
        this.saveNewUser(users)
    }

    static getId(id) {
        const users = Users.find();
        return users.find(item => item.id == id);
    }

    static getIdIndex(id) {
        const users = Users.find();
        return users.findIndex(item => item.id == id);
    }
}

module.exports = Users;