const User = require("../models/user.model.js");
const data = require("../data/users.json");

const getUsers = (req, res) => {
  const users = User.find();
  res.json({
    users,
  });
};

const getUserById = (req, res) => {
  const userId = req.params.userId;
  const users = User.find();
  const user = users.find((item) => item.userId == userId);

  if (!user) {
    return res.json({
      mgs: "not found",
    });
  }

  res.json({
    user,
  });
};

const createUserById = (req, res) => {
  const newUser = {
    userId: 3,
    avatar: "avatar",
    fullName: "Ngo Thi Loan",
    password: "00000",
    studentCode: "25236237",
    className: "NTL",
    schoolYear: "22",
    clubYear: "17",
  };
  //console.log(newUser);
  const user = new User(newUser);
  user.save();
  res.json({
    newUser,
  });
};

const updateUserById = (req, res) => {
  const userId = req.params.userId;
  const users = User.find();
  const newUser = req.body;
  const index = users.findIndex((item) => {
    item.userId == userId;
  });
  users.splice(index, 1, newUser);
  const newUsers = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), newUsers);
  res.json(newUsers);
  console.log(newUsers);
};

const deleteUserById = (req, res) => {
  const userId = req.params.userId;
  //let users = User.find();
  User.delete(userId);
  res.json();
};

module.exports = {
  getUsers,
  getUserById,
  createUserById,
  updateUserById,
  deleteUserById,
};
