const express = require("express");

const {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroomById,
  deleteClassroomById,
  addUserToClassroomById,
  deleteUserToClassroomById,
} = require("../controllers/classroom.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const classroomRouter = express.Router();

classroomRouter
  .route("/")
  .get(getClassrooms)
  .post(authMiddleware, createClassroom);

classroomRouter
  .route("/:classroomId")
  .get(getClassroomById)
  .put(authMiddleware, updateClassroomById)
  .delete(authMiddleware, deleteClassroomById);

classroomRouter
  .route("/:classroomId/:userId")
  .post(authMiddleware, addUserToClassroomById)
  .delete(authMiddleware, deleteUserToClassroomById);

module.exports = classroomRouter;
