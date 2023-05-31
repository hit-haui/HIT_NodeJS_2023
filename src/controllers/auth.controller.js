const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')
const login = async(req,res,next)=>{
    try{
        const {studentCode,password} = req.body;
        const user = await User.findOne({studentCode})
        // check user
        if(!user){
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }
        // compare so sanh matkhau nhap vao voi mat khau cua user -> tra ve boolean
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            const err = new Error("Student code or password is incorrect");
            err.status = 404;
            throw err;
        }
        const token = await jwt.sign(
          {
            userId: user._id,
          },
          process.env.SECRET_KEY,{
            expiresIn:'1h',
          }
        );
        res.json({
            message: "login success",token:token
        })
    }
    catch(err){
        next(err);
    }
}
module.exports = login;