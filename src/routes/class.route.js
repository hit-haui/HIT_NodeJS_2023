const express = require('express')

const classRouter = express.Router()

const authMiddleware = require('../middlewares/auth.middleware')

const {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroomById,
  deleteClassroomById,
  addUserToClassroom,
  deleteUserInClass,
} = require('../controllers/class.controller')

classRouter
  .route('/')
  .get(getClassroomById)
  .post(authMiddleware, createClassroom)

classRouter
  .route('/:classId')
  .get(getClassroomById)
  .put(authMiddleware, updateClassroomById)
  .delete(authMiddleware, deleteClassroomById)

classRouter
  .route('/:classId')
  .put(authMiddleware, addUserToClassroom)
  .delete(authMiddleware, deleteUserInClass)
module.exports = classRouter
