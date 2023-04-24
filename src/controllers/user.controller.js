const User = require("../models/user.model");
const getUsers = (req, res) => {
  const users = User.find();
  res.json({
    users,
  });
};
const getUserById = (req, res) => {
  const getUsers = User.find();
  const { userId } = req.params;
  const  user= getUsers.find((item) => item.id == userId);
  if (user) {
    res.json({ userById });
  } else {
    res.json({ message: "User not found" });
  }
};
const createUser = (req, res) => {
  const userCreated = new User(req.body);
  const users = userCreated.save();
  res.json({ users});
};
const updateUserById = (req, res) => {
  const getUsers = User.find();
  const userUpdated = new User(req.body);
  const { userId } = req.params;
  if(!userId){
    res.json({
      message:"Khong tim thay id!"
    })
  }
  const newUsers = users.map((item, index) => {
    if (item.id == userId) {
      return userUpdated;
    }
    return item;
  });
  res.json({ newUsers });
};
const deleteUserById = (req, res) => {
  const users = User.find();
  const { userId } = req.params;
  if(!userId){
    res.json({message:"Id khong ton tai!"})
  }
  const usersNew = users.filter((item) => item.id !== userId);
  res.json({ Newusers });
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
