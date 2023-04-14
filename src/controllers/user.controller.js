const {User} = require("../models/user.model");
const path = require('path');
const fs = require('fs');
const {v4 : uuidv4} = require('uuid');
// const users = User.find();
//   for (let user of users) {
//     if(!users.id){
//       user.id = uuidv4();
//     }
//   }

// const  userJson = JSON.stringify(users);
// fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson);

const getUsers = (req , res) => {
  const users = User.find();
  for (let user of users) {
    if(!users.id){
      user.id = uuidv4();
    }
  }
  const  userJson = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson);

  res.json(users);
};

const getUserById = (req , res) => {
  const id = req.params.id;
  const users = User.find();
  const user = users.find(product => product.id == id);
  if(!user){
    res.status(404).send('NOT FOUND');
    return;
  }
  res.json(user);
};

const createUser = (req, res) => {
  const data = req.body;
  const newUser = new User(data);
  newUser.id = uuidv4();
  newUser.save();
  res.json(newUser);
};

const updateUserById = (req, res) => {
  const users = User.find();
  const data = req.body;
  const id = req.params.id;
  const index = users.findIndex((user) => user.id == id);
  if(index == -1){
    res.status(404).send('NOT FOUND');
    return;
  }
  users.splice(index, 1, data);
  const userJson = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson);
  console.log(path.join(__dirname, "../data/users.json"));
  res.json(userJson);

};

const deleteUserById = (req, res) => {
  const users = User.find();
  const id = req.params.id;
  const index = users.findIndex((user) => user.id == id);
  if(index == -1){
    res.status(404).send('NOT FOUND');
    return;
  }
  users.splice(index, 1);
  const  userJson = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), userJson);
  res.json(userJson);
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
