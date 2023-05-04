const express = require("express");
const {
  getClassrooms,
  getClassById,
  createClassroom,
  updateClassById,
  deleteClassById,
  addUserToClassroomBtId,
  deleteUserFromClass,
} = require("../controllers/class.controller");

const authMiddleware = require("../middlewares/auth.middlewares");
const classroomRouter = express.Router();

classroomRouter
  .route("/")
  .get(getClassrooms)
  .post(authMiddleware, createClassroom);
classroomRouter
  .route("/:classID")
  .get(getClassById)
  .put(authMiddleware, updateClassById)
  .delete(authMiddleware, deleteClassById);

classroomRouter
  .route("/:classID/user")
  .post(authMiddleware, addUserToClassroomBtId)
  .delete(authMiddleware, deleteUserFromClass);
module.exports = classroomRouter;
