const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { log } = require("console");
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
    // static la dung cho lop ko dung cho doi tuong
    static save(users){
        // const newUsers = User.find();
        // convert instance class to object
        // newUsers.push(users); 
        // convert js - > JSON
        const userJson = JSON.stringify(users);
        fs.writeFileSync(
          path.join(__dirname, "../data/users.json"),userJson,(err)=>{
            if(err){
              console.log(err);
            }
            else{
              console.log("Write successful");
            }
          }
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
    static getById(id){
      const users = User.find();
      return users.find(user=>user.id == id);
    }
    create(){
      const users = User.find();
      users.push({...this});
      User.save(users);
    }
    static updateById (id,userUpdate){
       const users = User.find();
        const updatedUsers = users.map(user => {
            if (user.id == id) {
                return userUpdate;
            }
            return user;
        });
        User.save(updatedUsers);
    }
    static deleteById (id){
       const users = User.find();
        const deletedUsers = users.filter(user => {
            if (user.id != id) {
                return user;
            }
        });
        User.save(deletedUsers);
    }
}
module.exports = User;