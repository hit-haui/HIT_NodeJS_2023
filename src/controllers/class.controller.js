const Classroom = require("../models/classroom.model");

// get Classrooms
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

//get classroomById
const getClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  try {
    const classroom = await Classroom.findById(classroomId).populate([
      "leaders",
      "supports",
      "student",
    ]);
    if (!classroom) {
      const err = new Err("Classroom not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      classroom,
    });
  } catch (err) {
    next(err);
  }
};

//create classroom
const createClassroom = async (req, res, next) => {
  const newClassroom = req.body;
  try {
    const classroom = await Classroom.create(newClassroom);
    res.status(201).json({
      classroom,
    });
  } catch (err) {
    next(err);
  }
};

// update Classroom by id
const updateClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  try {
    const classroom = req.body;
    const updatedClass = await Classroom.findByIdAndUpdate(
      classroomId,
      classroom
    ).populate(["leaders", "supports", "students"]);
    if (!updatedClass) {
      const err = new Err("classroom not found!");
      err.status = 400;
      throw err;
    }
    res.status(200).json({
      updatedClass,
    });
  } catch (err) {
    next(err);
  }
};

// delete classroom
const deleteClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  try {
    const classroom = req.body;
    const deleteClass = await Classroom.findByIdAndDelete(classroomId);
    if (!deleteClass) {
      const err = new Err("classroom not found!");
      err.status = 400;
      throw err;
    }
    res.status(200).json({
      deleteClass,
    });
  } catch (err) {
    next(err);
  }
};

// add user to classroom
const addUserToClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  const { userId, role } = req.body;
  try {
    //check permission
    if (!["leaders", "supports", "students"].includes(role)) {
      const err = new Err("You do not have access permission");
      err.status = 400;
      throw err;
    }
    //check classroom
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      const err = new Err("classroom not found");
      err.status = 404;
      throw err;
    }
    //check if user exists in class
    const checkUserExists = classroom[`${role}s`].includes(userId);
    if (checkUserExists) {
      const err = new Err("User already exists in the classroom");
      err.status = 400;
      throw err;
    }
    //add user to the class
    classroom[`${role}s`].push(Object(userId));
    const newUser = await classroom.save();
    res.status(201).json({
      newUser,
    });
  } catch (err) {
    next(err);
  }
};

// delete user to classroom
const deleteUserToClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  const { userId, role } = req.body;
  try {
    //check permission
    if (!["leaders", "supports", "students"].includes(role)) {
      const err = new Err("You do not have access permission");
      err.status = 400;
      throw err;
    }
    //check classroom
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      const err = new Err("classroom not found");
      err.status = 404;
      throw err;
    }
    //check if user exists in class
    const checkUserExists = classroom[`${role}s`].includes(userId);
    if (checkUserExists) {
      const err = new Err("User already exists in the classroom");
      err.status = 400;
      throw err;
    }

    // delete user
    classroom[`${role}s`].remove(userId);
    const deleteUser = await classroom.save();
    res.status(200).json({
      deleteUser,
    });
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
