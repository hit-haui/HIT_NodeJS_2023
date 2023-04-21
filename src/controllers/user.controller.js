
const UserModel = require("../models/user.model");

// get users
const getUsers = async (req, res) => {
  try {
    const data = await UserModel.find({});
    res.json({
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Buggg!!!"
    })
  }
};

// get user by id
const getUserById = async (req, res) => {
  const { userId } = req.params;
  // check user
  try {
    const user = await UserModel.findOne({_id: userId});
    console.log(user);
    if (user) {
      res.json({
        user
      })
    }
    else {
      res.status(400).json({
        msg: "User not found"
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: "Lai bugg!!!"
    })
  }
};

// create user
const createUser = async(req, res) => {
  // new user
  const userRaw = req.body;
  try {
    const data = await UserModel.create({
      avatar: userRaw.avatar,
      fullName: userRaw.fullName,
      dataOfBirth: userRaw.dataOfBirth,
      password: userRaw.password,
      studentCode: userRaw.studentCode,
      className: userRaw.className,
      schoolYear: userRaw.schoolYear,
      clubYear: userRaw.clubYear
    })
    res.json({
      msg: "successful!!!"
    })
  } catch (error) {
    res.status(500).json({
      msg: "Lai bugg!!!"
    })
  }
};

// edit user information by id
const updateUserById = async(req, res) => {
  const userId = req.params.userId;
  const userRaw = req.body;
  // const newUser = new UserModel({
  //     avatar: userRaw.avatar,
  //     fullName: userRaw.fullName,
  //     dataOfBirth: userRaw.dataOfBirth,
  //     password: userRaw.password,
  //     studentCode: userRaw.studentCode,
  //     className: userRaw.className,
  //     schoolYear: userRaw.schoolYear,
  //     clubYear: userRaw.clubYear
  // });
  // check user
  try {
    const user = await UserModel.findOneAndUpdate({_id: userId}, {
      avatar: userRaw.avatar,
      fullName: userRaw.fullName,
      dataOfBirth: userRaw.dataOfBirth,
      password: userRaw.password,
      studentCode: userRaw.studentCode,
      className: userRaw.className,
      schoolYear: userRaw.schoolYear,
      clubYear: userRaw.clubYear
    });
    console.log(user);
    res.json({
      user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Lai Buggg!!!"
    })
  }
};

// delete user by id
const deleteUserById = async(req, res) => {
  const userId = req.params.userId;
  // check user
  try {
    const user = await UserModel.deleteOne({_id: userId})
    console.log(user);
    res.json({
     msg: "Deleting successful"
    })
  } catch (error) {
    res.status(500).json({
      msg: "Lai Buggg!!!"
    })
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};