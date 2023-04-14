const fs=require('fs');
const path=require('path');
const {v4 : uuidv4} = require('uuid');
class User{
    constructor({id,avatar,fullName,dateOfBirth,password,studentCode,className,schoolYear,clubYear}){
        this.id=id;
        this.avatar=avatar;
        this.fullName=fullName;
        this.dateOfBirth=dateOfBirth;
        this.studentCode=studentCode;
        this.password=password;
        this.className=className;
        this.schoolYear=schoolYear;
        this.clubYear=clubYear;
    }

    static find(){
        try{
            const userJson = fs.readFileSync(path.join(__dirname, "../data/users.json"));
            const users = JSON.parse(userJson) ;
            return users;
        }catch(err){
            console.error(err);
        }
    
    }
    save(){
        const newUser = this;
        const users = User.find();
        users.push({...newUser});
        const userJson = JSON.stringify(users);
        fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson)
    }
}

module.exports = {
    User,
}



