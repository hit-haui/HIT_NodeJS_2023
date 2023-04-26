const Classroom = require("../models/classroom.model");

// get all classrooms
const getClassrooms = async (req, res, next) => {
    try {
        const data = await Classroom.find().populate(['leaders', 'supports', 'students']);
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    };
};

// get classroom by id
const getClassroomById = async (req, res, next) => {
    const { classroomId } = req.params;
    try {
        const data = await Classroom.findById(classroomId).populate(['leaders', 'supports', 'students']);
        if (!data) {
            throw Object.assign(new Error('Classroom not found!'), { status: 404 });
        }
        else return res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    };
};

// create classroom
const createClassroom = async (req, res, next) => {
    const newClassroom = req.body;
    try {
        const data = await Classroom.create(newClassroom);
        res.status(201).json({ data });
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
        const data = await Classroom.findByIdAndUpdate(classroomId, newClassroom);
        if (!data) {
            throw Object.assign(new Error('Classroom not found!'), { status: 404 });
        }
        else return res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    };
};

// delete classroom by id
const deleteClassroomById = async (req, res, next) => {
    const { classroomId } = req.params;
    try {
        const data = await Classroom.findByIdAndDelete(classroomId);
        if (!data) {
            throw Object.assign(new Error('Classroom not found!'), { status: 404 });
        }
        else return res.status(200).json({ data });
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
            throw Object.assign(new Error('Invalid role'), { status: 400 });
        }
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            throw Object.assign(new Error('Classroom not found!'), { status: 404 });
        }
        const checkUserExist = classroom[`${role}s`].includes(userId);
        if (checkUserExist) {
            throw Object.assign(new Error('User already exists in the class!'), { status: 400 });
        }
        classroom[`${role}s`].push(userId);
        const data = await classroom.save();
        res.status(201).json(data);
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
            throw Object.assign(new Error('Invalid role'), { status: 400 });
        }
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            throw Object.assign(new Error('Classroom not found!'), { status: 404 });
        }
        const checkUserExist = classroom[`${role}s`].includes(userId);
        if (!checkUserExist) {
            throw Object.assign(new Error('User do not exists in the class!'), { status: 400 });
        }
        classroom[`${role}s`].remove(userId);
        const data = await classroom.save();
        res.status(201).json(data);
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