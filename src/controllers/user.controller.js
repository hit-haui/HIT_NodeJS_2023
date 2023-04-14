const User = require('../models/user.model');
const users = User.getAllUsers();

const getUsers = (req, res) => {
    /* Check user hasn't id and add id */
    for (let item of users) {
        if (!item.id) {
            let itemId = User.generateRandomId();
            User.saveIdSet();
            item.id = itemId;
        }
    }
    User.saveData();
    /* End check */
    let data = users;
    const { schoolYear, schoolYear_gt, schoolYear_lt } = req.query;
    if (schoolYear) {
        data = users.filter(user => user.schoolYear == schoolYear);
    } else if (schoolYear_gt) {
        data = users.filter(user => user.schoolYear > +schoolYear_gt);
    } else if (schoolYear_lt) {
        data = users.filter(user => user.schoolYear < +schoolYear_lt);
    }
    if (!data.length) return res.json({ message: "No User Found !" });
    else res.json(data);
}

const getUserById = (req, res) => {
    const userId = req.params.id;
    const user = User.getById(userId);
    if (user) res.json(user);
    else res.json({ message: "No User Found !" });
}

const creatUser = (req, res) => {
    const data = req.body;
    const userId = User.generateRandomId();
    User.saveIdSet();
    const newUser = new User(userId, data.avatar, data.fullName, data.dateOfBirth, data.password, data.studentCode, data.className, data.schoolYear, data.clubYear);
    users.push({ ...newUser });
    User.saveData();
    res.json(users);
}

const updateUserById = (req, res) => {
    const userId = req.params.id;
    const user = User.getById(userId);
    if (!user) return res.json({ message: "No User Found !" });
    User.deleteId(userId);
    const newUserId = User.generateRandomId();
    User.saveIdSet();
    const data = req.body;
    const newUser = new User(newUserId, data.avatar, data.fullName, data.dateOfBirth, data.password, data.studentCode, data.className, data.schoolYear, data.clubYear);
    let index = users.findIndex(item => item.id == userId);
    users[index] = { ...newUser };
    User.saveData();
    res.json(users);
}

const deleteUserById = (req, res) => {
    const userId = req.params.id;
    const user = User.getById(userId);
    if (!user) return res.json({ message: "No User Found !" });
    User.deleteId(userId);
    User.saveIdSet();
    let index = users.findIndex(item => item.id == userId);
    users.splice(index, 1);
    User.saveData();
    res.json(users);
}

module.exports = {
    getUsers,
    getUserById,
    creatUser,
    updateUserById,
    deleteUserById
};