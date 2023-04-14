const express = require('express');
const router = express.Router();

const {
    getUser,
    getUserByStudentCode,
    createUser,
    deleteUserBystudentCode,
    updateUserByStudentCode
} = require('../controllers/user.controller');

router.route('/users').get(getUser).post(createUser);
router.route('/users/:studentCode')
.get(getUserByStudentCode)
.delete(deleteUserBystudentCode)
.put(updateUserByStudentCode);

module.exports = router;