const fs = require("fs");
const path = require("path");

class User {
    constructor(avatar,fullName,dateOfBirth,password,studentCode,className,schoolYear,clubYear){
        this.avatar=avatar;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.studentCode = studentCode;
        this.className = className;
        this.schoolYear = schoolYear;
        this.clubYear = clubYear;
    }
    save(){
        const newUser = this;
        const users = User.find();
        // convert instance class to object
        users.push(newUser); 
        // convert js - > JSON
        const userJson = JSON.stringify(users);
        fs.writeFileSync(
          path.join(__dirname, "../data/users.json"),userJson
        );
    }
    static find() {
        try {
          const userJson = fs.readFileSync(
            path.join(__dirname, "../data/users.json"),
            "utf8"
          );
            // chuyển json thành js:
            const users = JSON.parse(userJson);
            return users; 
        } catch (error){
            console.log(error);
        }
    }
}
module.exports = User;