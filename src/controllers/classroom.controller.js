const Classroom = require("../models/classroom.model");
const getClassrooms = async (req, res, next) => {
  try {
    const classrooms = await Classroom.find().populate([
      "leaders",
      "supports",
      "students",
    ]);
    res.status(200).json({
      classrooms,
    });
  } catch (err) {
    next(err);
  }
};
const getClassroomById = async (req, res, next) => {
  try {
    const { classroomId } = req.params;
    const classroom = await Classroom.findById(classroomId).populate([
      "leaders",
      "supports",
      "students",
    ]);
    if (!classroom) {
      const error = new Error("Classroom not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      classroom,
    });
  } catch (err) {
    next(err);
  }
};
const createClassroom = async (req, res, next) => {
  try {
    const classroom = req.body;
    if (!classroom.name || !classroom.classCode) {
      const error = new Error("Not enough information about classroom! ");
      error.status = 400;
      throw error;
    }
    const newClassroom = await Classroom.create(classroom);
    res.status(201).json({
      newClassroom,
    });
  } catch (err) {
    next(err);
  }
};
const updateClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  const classroom = req.body;
  try {
    const updateClassroom = await Classroom.findByIdAndUpdate(
      classroomId,
      classroom
    );
    if (!updateClassroom) {
      const error = new Error("Classroom has not been updated");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      updateClassroom,
    });
  } catch (err) {
    next(err);
  }
};
const deleteClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  const permission = req.body;
  try {
    const deleteClassroom = await Classroom.findByIdAndDelete(
      classroomId,
      permission
    );
    if (!deleteClassroom) {
      const error = new Error("Classroom has not been updated");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      deleteClassroom,
    });
  } catch (err) {
    next(err);
  }
};
const addUserToClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  const { userId, role } = req.body;
  try {
    if (!["leader", "support", "student"].includes(role)) {
      const error = new Error("Invaid role");
      error.status = 400;
      throw error;
    }
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      const error = new Error("Classroom not found");
      error.status = 404;
      throw error;
    }
    const isUserExist = classroom[`${role}s`].includes(userId);
    if (isUserExist) {
      const error = new Error("User exists in classroom");
      error.status = 400;
      throw error;
    }
    classroom[`${role}s`].push(userId);
    const addedUserToClassroomById = await classroom.save();
    res.status(201).json(addedUserToClassroomById);
  } catch (err) {
    next(err);
  }
};
const deleteUserToClassroomById = async (req, res, next) => {
  try {
    const { classroomId } = req.params;
    const { userId, role } = req.body;
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      const error = new Error("Classroom not found");
      error.status = 404;
      throw error;
    }
    if (!["leader", "support", "student"].includes(role)) {
      const error = new Error("Invaid role");
      error.status = 400;
      throw error;
    }
    const isUserExist = classroom[`${role}s`].includes(userId);
    if (!isUserExist) {
      const error = new Error("User not exists in classroom.");
      error.status = 404;
      throw error;
    }
    classroom[`${role}s`].remove(userId);
    const deletedUserToClassroomById = await classroom.save();
    res.status(200).json({ deletedUserToClassroomById });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroomById,
  deleteClassroomById,
  addUserToClassroomById,
  deleteUserToClassroomById,
};
