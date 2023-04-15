const User = require('../models/user.model');

const getUsers = (req, res) => {
    const users = User.find();

    res.json(users);
}

const addUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.add();

    res.json({
        msg: 'Add successful'
    });
}

const getUserById = (req, res) => {
    const { id } = req.params;
    const user = User.getById(id);

    if (!user) {
        return res.status(404).json({
            msg: 'User not found'
        });
    }

    res.json(user);
}

const updateUserById = (req, res) => {
    const { id } = req.params;
    const user = User.getById(id);

    if (!user) {
        return res.status(404).json({
            msg: 'User not found'
        });
    }

    User.updateById(id, req.body);

    res.json({
        msg: 'Update successful'
    })
}

const deleteUserById = (req, res) => {
    const { id } = req.params;
    const user = User.getById(id);

    if (!user) {
        return res.status(404).json({
            msg: 'User not found'
        });
    }

    User.deleteById(id);

    res.json({
        msg: 'Delete successful'
    })
}

module.exports = {
    getUsers,
    addUser,
    getUserById,
    updateUserById,
    deleteUserById,
}
