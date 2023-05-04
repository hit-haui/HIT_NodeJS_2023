const express = require("express");
const {
  getClassroom,
  createClassroom,
  deleteClassroomById,
  updateClassroomById,
  getClassroomById,
  addUserToClassroomById,
  deleteUserToClassroomById,
} = require("../controllers/classroom.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const classroomRouter = express.Router();

classroomRouter
  .route("/")
  .get(getClassroom)
  .post(authMiddleware,createClassroom);
classroomRouter
  .route("/:classroomId")
  .get(getClassroomById)
  .put(authMiddleware, updateClassroomById)
  .delete(authMiddleware, deleteClassroomById);

classroomRouter
  .route("/:classroomId/user")
  .post(authMiddleware, addUserToClassroomById)
  .delete(authMiddleware, deleteUserToClassroomById);

module.exports = classroomRouter;
