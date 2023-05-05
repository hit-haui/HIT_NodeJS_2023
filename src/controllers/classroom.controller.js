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
      throw {
        message: `Classroom with id ${classroomId} not found!`,
        status: 400,
      };
    }
    res.status(200).json({
      classroom,
    });
  } catch (error) {
    next(error);
  }
};

const createClassroom = async (req, res, next) => {
  let newClassroom = req.body;
  const { leaders } = req.body;
  try {
    // check if there is a required field
    if (!leaders)
      throw {
        message: "Invalid input data!",
        status: 400,
      };
    newClassroom = req.body;
    const classroom = await Classroom.create(newClassroom);
    res.status(201).json({
      classroom,
    });
  } catch (error) {
    next(error);
  }
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
    if (!updatedClassroom) {
      throw {
        message: `Classroom with id ${classroomId} not found!`,
        status: 400,
      };
    }
  } catch (error) {
    next(error);
  }
};

const deleteClassroomById = async (req, res, next) => {
  const { classroomId } = req.params;
  try {
    const deletedClassroom = await Classroom.findByIdAndDelete(classroomId);
    if (!deletedClassroom) {
      throw {
        message: `Classroom with id ${classroomId} not found!`,
        status: 400,
      };
    }
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
      throw {
        message: "Invalid role!",
        status: 400,
      };
    }

    // check if the classroom exists or not
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      throw {
        message: `Classroom with id ${classroomId} not found!`,
        status: 400,
      };
    }

    // check if user exists in class
    const userExist = classroom[`${role}s`].includes(userId);
    if (userExist) {
      throw {
        message: "User already exists in the class!",
        status: 400,
      };
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
    if (!classroom) {
      throw Object.assign(
        new Error(`Classroom with id ${classroomId} not found!`),
        { status: 400 }
      );
    }

    // check if user exists in class
    const isUserExist = classroom[`${role}s`].includes(userId);
    if (!isUserExist) {
      throw {
        message: "User does not exist in this classroom!",
        status: 400,
      };
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
