const express = require('express')

const classRouter = express.Router()

const authMiddleware = require('../middlewares/auth.middleware')

const {
  getClassroom,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  addUserToClassroom,
  deleteUserInClass,
} = require('../controllers/class.controller')

classRouter.route('/').get(getClassroom).post(authMiddleware, createClassroom)

classRouter
  .route('/:classId')
  .get(getClassroomById)
  .put(authMiddleware, updateClassroom)
  .delete(authMiddleware, deleteClassroom)

classRouter
  .route('/:classId')
  .put(authMiddleware, addUserToClassroom)
  .delete(authMiddleware, deleteUserInClass)
module.exports = classRouter
