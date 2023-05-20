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
  } catch (error) {
    next(error);
  }
};

const getClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  try {
    const classroom = await Classroom.findById(classroomId).populate([
      "leaders",
      "supports",
      "students",
    ]);
    if (!classroom) {
      const err = new Error(`Classroom with id ${classroomId} not found!`);
      err.status = 400;
      throw err;
    }
    res.status(200).json({
      classroom,
    });
  } catch (error) {
    next(error);
  }
};

const checkRequiredFields = (newClassroom) => {
  const { leaders, name } = newClassroom;
  if (!leaders || !name) {
    const error = new Error("Invalid input data!");
    error.status = 400;
    throw error;
  }
};
const createClassroom = async (req, res, next) => {
  const newClassroom = req.body;
  try {
    checkRequiredFields(newClassroom);
    const classroom = await Classroom.create(newClassroom);
    res.status(201).json({
      classroom,
    });
  } catch (error) {
    next(error);
  }
};

const handleNonExistClassroom = (classroomId) => {
  const err = new Error(`Classroom with id ${classroomId} not found!`);
  err.status = 400;
  throw err;
};

const updateClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  const updatedData = req.body;
  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      classroomId,
      updatedData,
      {
        new: true,
      }
    );
    if (!updatedClassroom) return handleNonExistClassroom(classroomId);

    res.status(200).json({
      updatedClassroom,
    });
  } catch (error) {
    next(error);
  }
};

const deleteClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  try {
    const deletedClassroom = await Classroom.findByIdAndDelete(classroomId);
    if (!deletedClassroom) return handleNonExistClassroom(classroomId);

    res.status(200).json({
      deletedClassroom,
    });
  } catch (error) {
    next(error);
  }
};

// add user to classroom by classroomId, user role
const addUserToClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  const { userId } = req.body;
  const { role } = req.query;
  const newUser = req.body;
  try {
    // check exist role
    if (!["leader", "support", "student"].includes(role)) {
      const err = new Error("Invalid role!");
      err.status = 400;
      throw err;
    }

    // check if the classroom exists or not
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) return handleNonExistClassroom(classroomId);

    // check if user exists in class
    const isUserExist = classroom[`${role}s`].includes(userId);
    if (isUserExist) {
      const err = new Error("User already exists in the class!");
      err.status = 400;
      throw err;
    }

    // add user to the classroom
    classroom[`${role}s`].push(userId);

    // save the changes to the database
    classroom.save();

    // return newUser
    res.status(201).json({
      role,
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

// delete user from classroom by classroomId, userId
const deleteUserFromClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  const { userId } = req.body;
  const { role } = req.query;
  try {
    // check if the classroom exists or not
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) return handleNonExistClassroom(classroomId);

    // check if user exists in class
    const isUserExist = classroom[`${role}s`].includes(userId);
    if (!isUserExist) {
      const err = new Error("User does not exist in this classroom!");
      err.status = 400;
      throw err;
    }

    // delete user
    classroom[`${role}s`].pull(userId);

    // save the changes to the database
    classroom.save();

    // return deletedUser
    const deletedUser = classroom[`${role}s`].find(
      (item) => item.userId !== userId
    );
    res.status(200).json({
      role,
      deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroomById,
  deleteClassroomById,
  addUserToClassroomById,
  deleteUserFromClassroomById,
};
