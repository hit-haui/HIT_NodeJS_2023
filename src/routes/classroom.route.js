const express = require("express");

const {
    getClassrooms,
    createClassroom,
    deleteClassroomById,
    updateClassroomById,
    getClassroomById,
    addUserToClassroomById,
    deleteUserFromClassroomById,
} = require("../controllers/classroom.controller");

const classroomRouter = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

classroomRouter.route('/')
    .get(getClassrooms)
    .post(authMiddleware, createClassroom)

classroomRouter.route('/:classroomId')
    .get(getClassroomById)
    .put(authMiddleware, updateClassroomById)
    .delete(authMiddleware, deleteClassroomById)

classroomRouter.route('/:classroomId/user')
    .post(authMiddleware, addUserToClassroomById)
    .delete(authMiddleware, deleteUserFromClassroomById)

module.exports = classroomRouter;