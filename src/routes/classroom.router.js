const express = require("express");
const {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroomById,
  deleteClassroomById,
  addUserToClassroomById,
  deleteUserFromClassroomById,
} = require("../controllers/class.controller");

const authMiddleware = require("../middleware/auth.middleware");
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
  .route("./classroomId/user")
  .put(authMiddleware, addUserToClassroomById)
  .delete(authMiddleware, deleteUserFromClassroomById);
module.exports = classroomRouter;
