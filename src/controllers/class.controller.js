const Classroom = require("../models/classroom.model");

const getClassrooms = async (req, res, next) => {
  try {
    const classrooms = await Classroom.find().populate([
      "leaders",
      "supports",
      "students",
    ]);
    res.status(200).json({ classrooms });
  } catch (err) {
    next(err);
  }
};
//getbyid
const getClassById = async (req, res, next) => {
  const { classID } = req.params;
  try {
    const classroom = await Classroom.findById(classID).populate([
      "leaders",
      "supports",
      "students",
    ]);
    if (!classroom) {
      const err = new Error("Classroom not found!");
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

//update by id
const updateClassById = async (req, res, next) => {
  const { classID } = req.params;
  const updateClass = req.body;
  try {
    const classUpdate = await Classroom.findByIdAndUpdate(
      classID,
      updateClass
    ).populate(["leaders", "supports", "students"]);
    if (!classUpdate) {
      const err = new Error("Classroom not found!");
      err.status = 400;
      throw err;
    }
    res.status(200).json({ classUpdate });
  } catch (err) {
    next(err);
  }
};

//delete class
const deleteClassById = async (req, res, next) => {
  const { classID } = req.params;
  try {
    const deleteClass = await Classroom.findByIdAndDelete(classID);
    if (!deleteClass) {
      const err = new Error("Classroom not found!");
      err.status(400);
      throw err;
    }
    res.status(200).json({ deleteClass });
  } catch (err) {
    next(err);
  }
};

//add user to classroom
const addUserToClassroomBtId = async (req, res, next) => {
  const { classID } = req.params;
  const { userId, role } = req.body;
  try {
    //check permission
    if (!["leader", "support", "student"].includes(role)) {
      const err = new Error("You do not have access permission");
      err.status = 400;
      throw err;
    }
    // check classroom
    const classroom = await Classroom.findById(classID);
    if (!classroom) {
      const err = new Error("Classroom not found");
      err.status = 404;
      throw err;
    }
    //check if user exists in class
    const checkUserExists = classroom[`${role}s`].includes(userId);
    if (checkUserExists) {
      const err = new Error("User already exists in the class");
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

const deleteUserFromClass = async (req, res, next) => {
  const { classID } = req.params;
  const { userId, role } = req.body;
  try {
    if (!["leader", "support", "student"].includes(role)) {
      const err = new Error("You do not have access permission");
      err.status = 400;
      throw err;
    }
    const classroom = await Classroom.findById(classID);
    if (!classroom) {
      const err = new Error("Classroom not found!");
      err.status = 404;
      throw err;
    }
    //check if user exists in class
    const checkUserExists = classroom[`${role}s`].includes(userId);
    if (!checkUserExists) {
      const err = new Error("User does not exist in the class!");
      err.status = 400;
      throw err;
    }
    classroom[`${role}s`].remove(userId);
    const deleteUSer = await classroom.save();
    res.status(200).json({
      deleteUSer,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getClassrooms,
  getClassById,
  createClassroom,
  updateClassById,
  deleteClassById,
  addUserToClassroomBtId,
  deleteUserFromClass,
};
