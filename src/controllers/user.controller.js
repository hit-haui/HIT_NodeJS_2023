const User = require("../models/user.model");

//getAllUser
const getUsers = (req, res) => {
  const users = User.getUser();
  res.status(200).json({
    users,
  });
};
//getById
const getUserById = (req, res) => {
  const {id} = req.params;
  const user = User.getById(id);
  if(!user){
    return res.status(404).json({
      msg:"User not found"
    })
  }
  res.status(200).json({
    user
  })
};

const createUsers = (req, res) => {
   const user  = req.body;
   const newUser = new User(user);
   newUser.createUser();
   res.status(201).json({
    msg:"Successful create user"
   });
};

const updateUserById = (req, res) => {
  const {id} = req.params;
  const user = User.getById(id);
  if(!user){
    return res.status(404).json({
      msg:"User not found"
    });
  }
  const userNew = req.params;
  User.updateUser(id,userNew);
  res.status(200).json({
    msg:"Successfull"
  })

};

//delete
const deleteUserById = (req, res) => {
  const { id } = req.params;
  const user = User.getById(id);
  if(!user){
    return res.status(404).json({
      msg:"User not found"
    });
  }
  else{
    User.deleteUser(user);
    res.status(200).json({
      message: "Successfully deleted",
    });
  }
};
module.exports = {
  getUsers,
  getUserById,
  createUsers,
  updateUserById,
  deleteUserById,
};

