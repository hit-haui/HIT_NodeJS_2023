const Users = require('../models/user.model');

const fs = require("fs");

const path = require("path");

const getUsers = (req, res) => {
    const users = Users.find();
    console.log(users);
    return res.json(users);
}

const getUserById = (req, res) => {
    const users = Users.find();
    const userId = req.params.userId;
    const user = Users.getId(userId);
    if(!user){
        res.json(
            console.log('Not found')
        )
    }
    return res.json(users)
}

const createUser = (req, res) => {
    const data = req.body;
    const newUser = new Users(data);
    newUser.save();
    return res.json(newUser);
}

const updateUserById = (req, res) => {
    const users = Users.find();
    const userId = req.params.userId;
    const index = Users.getIdIndex(userId);
    if(index == -1){ 
        res.json(
            console.log("NOT FOUND USERS")
        )
    }
    const data = req.body;
    const newUser = new Users(data);
    users.splice(index, 1, newUser);
    fs.writeFileSync(path.join(__dirname,'../data/users.json'), JSON.stringify(users), (err) => {
        if(err){
            console.log(err);
        } else {
            console.log('Success');
        }
    })
    return res.json(users);
}

const deleteUserById = (req, res) => {
    const users = Users.find();
    const userId = req.params.userId;
    const index = Users.getIdIndex(userId)
    if(index == -1){
        console.log('NOT FOUND');
    }
    users.splice(index, 1);
    fs.writeFileSync(path.join(__dirname,'../data/users.json'), JSON.stringify(users), (err) => {
        if(err){
            console.log(err);
        } else {
            console.log('Success');
        }
    })
    return res.json(users);
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
}