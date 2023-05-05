const Classroom = require("../models/classroom.model");

// get all classrooms
const getClassrooms = async (req, res, next) => {
    try {
        const classrooms = await Classroom.find().populate(['leaders', 'supports', 'students']);
        res.status(200).json({ classrooms });
    }
    catch (err) {
        next(err);
    };
};

// get classroom by id
const getClassroomById = async (req, res, next) => {
    const { classroomId } = req.params;
    try {
        const classroom = await Classroom.findById(classroomId).populate(['leaders', 'supports', 'students']);
        if (!classroom) {
            const err = new Error('Classroom not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ classroom });
    }
    catch (err) {
        next(err);
    };
};

// create classroom
const createClassroom = async (req, res, next) => {
    const newClassroom = req.body;
    try {
        const classroom = await Classroom.create(newClassroom);
        res.status(201).json({ classroom });
    }
    catch (err) {
        next(err);
    };
};

// edit classroom imformation by id
const updateClassroomById = async (req, res, next) => {
    const { classroomId } = req.params;
    const newClassroom = req.body;
    try {
        const classroom = await Classroom.findByIdAndUpdate(classroomId, newClassroom);
        if (!classroom) {
            const err = new Error('Classroom not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ classroom });
    }
    catch (err) {
        next(err);
    };
};

// delete classroom by id
const deleteClassroomById = async (req, res, next) => {
    const { classroomId } = req.params;
    try {
        const classroom = await Classroom.findByIdAndDelete(classroomId);
        if (!classroom) {
            const err = new Error('Classroom not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ classroom });
    }
    catch (err) {
        next(err);
    };
};

// add members to classroom
const addUserToClassroomById = async (req, res, next) => {
    const { classroomId } = req.params;
    const { userId, role } = req.body;
    try {
        if (!['leader', 'support', 'student'].includes(role)) {
            const err = new Error('Invalid role!');
            err.status = 400;
            throw err;
        }
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            const err = new Error('Classroom not found!');
            err.status = 404;
            throw err;
        }
        const isUserExist = classroom[`${role}s`].includes(userId);
        if (isUserExist) {
            const err = new Error('User already exists in the class!');
            err.status = 400;
            throw err;
        }
        classroom[`${role}s`].push(userId);
        const userAdded = await classroom.save();
        res.status(201).json(userAdded);
    }
    catch (err) {
        next(err);
    };
};

// delete members from classroom
const deleteUserFromClassroomById = async (req, res, next) => {
    const { classroomId } = req.params;
    const { userId, role } = req.body;
    try {
        if (!['leader', 'support', 'student'].includes(role)) {
            const err = new Error('Invalid role!');
            err.status = 400;
            throw err;
        }
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            const err = new Error('Classroom not found!');
            err.status = 404;
            throw err;
        }
        const isUserExist = classroom[`${role}s`].includes(userId);
        if (!isUserExist) {
            const err = new Error('User do not exists in the class!');
            err.status = 400;
            throw err;
        }
        classroom[`${role}s`].remove(userId);
        const userDeleted = await classroom.save();
        res.status(201).json(userDeleted);
    }
    catch (err) {
        next(err);
    };
}

module.exports = {
    getClassrooms,
    getClassroomById,
    createClassroom,
    updateClassroomById,
    deleteClassroomById,
    addUserToClassroomById,
    deleteUserFromClassroomById,
};