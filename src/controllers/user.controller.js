
const User = require("../models/user.model");

// get users
const getUsers = async (req, res) => {
  // get all user
  try {
    const users = await User.find({});
    // console.log(users);
    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json({
      error:err.message,
    });
  }
}


// get user by id
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const userById = await User.findOne({_id:userId});
    // Check user
    if (!userById) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    // tra ve user tu id 
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// create user
const createUser = async (req, res) => {
  // New user
  const userCreated = req.body;
  // tao ra 1 user moi
  try {
    const newUser = await User.create(userCreated);
    // tra ra user moi
    res.status(201).json({
      newUser,
    });
  } 
  // tra ra loi
  catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// update user by id
const updateUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const userUpdateById = req.body;
    // Update user
    const updatedUser = await User.findByIdAndUpdate({_id: userId}, userUpdateById);
    // Check user ton tai
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    // tra ra user duoc update
    res.status(200).json({
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    // Delete user
    const userDeleteById = await User.findByIdAndDelete({_id:userId});
    // Check user xem ton tai ko
    if (!userDeleteById) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    // tra ra sau khi xoa
    res.status(200).json({
      message:"Xoa thanh cong!"
    });
  }
  // ban ra loi  
  catch (err) {
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