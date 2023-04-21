
const User = require("../models/users.model");
//getAllUser
const getUsers = async(req, res) => {
  try{
    const users = await User.getUser();
    res.status(200).json({
      users,
    });
  }catch (err){
    res.status(500).json({
      error: err.message
  });
  }

};
//getById
const getUserById = async (req, res) => {
  const {id} = req.params;
  try{
    const user = await User.findById(id);
    if(!user){
      return res.status(404).json({
        msg:"User not found"
      })
    }
    res.status(200).json({
      user
    });
  }catch (err){
    res.status(500).json({
      error: err.message
  });
  }

};
//creat
const createUsers =async (req, res) => {
   const user  = req.body;
   const newUser = new User(user);
   try{
    const user = await User.create(newUser);
        res.status(201).json({
            user
        });
   }catch{
    res.status(500).json({
      error: err.message
  });
   }
};

//update
const updateUserById =async (req, res) => {
  const {id} = req.params;
  try{
    const userUpdate = req.body;
    const user =await User.findByIdAndUpdate(id,userUpdate );
    if(!user){
      return res.status(404).json({
        msg:"User not found"
      });
    }
  res.status(200).json({
    updatedUser
  });
  }catch (err){
    res.status(500).json({
      error: err.message
  });
  }

};

//delete
const deleteUserById =async (req, res) => {
  const { id } = req.params;
  try{
    const user =await User.findByIdAndRemove(id);
    if(!user){
      return res.status(404).json({
        msg:"User not found"
      });
    }
    res.status(200).json({
      userDeleted
    });
  }catch{
    res.status(500).json({
      error: err.message
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

