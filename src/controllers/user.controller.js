const User = require("../models/user.model");
//getAllUser
const getUsers = async(req, res) => {
  try{
    const users = await User.find();
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
  const {userId} = req.params;
  try{
    const user = await User.findById(userId);
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
const createUser =async (req, res) => {
   const user  = req.body;
   const newUser = new User(user);
   try{
    const user = await User.create(newUser);
        res.status(201).json({
            user
        });
  // try{
  //   const newUser = await User.create(user);
  //   res.status(201).json({
  //       user
  //   });
   }catch (err){
    res.status(500).json({
      error: err.message
  });
   }
};

//update
const updateUserById =async (req, res) => {
  const {userId} = req.params;
  try{
    const userUpdate = req.body;
    const user =await User.findByIdAndUpdate(userId,userUpdate );
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
  const { userId } = req.params;
  try{
    const user =await User.findByIdAndDelete(userId);
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
  createUser,
  updateUserById,
  deleteUserById,
};
