const Classroom = require("../models/classroom.model");

const getClassrooms = async (req, res, next) => {
    try {
        const classrooms = await Classroom.find().populate(['leaders', 'supports', 'students']);
        res.status(200).json({ classrooms });
    } catch (err) {
        next(err);
    }
}

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
    } catch (err) {
        next(err);
    }
};

const createClassroom = async (req, res, next) => {
    const rawClassroom = req.body;
    try {
        if (!rawClassroom.name || !rawClassroom.startTime) {
            const err = new Error('Invalid classroom');
            err.status = 400;
            throw err;
        }
        const newClassroom = await Classroom.create(rawClassroom);
        res.status(201).json({ newClassroom });
    } catch (err) {
        next(err);
    }
};

const updateClassroomById = async (req, res, next) => {
    const { classroomId } = req.params;
    const rawClassroom = req.body;
    try {
        const updatedClassroom = await Classroom.findByIdAndUpdate(classroomId, rawClassroom, { new: true });
        if (!updatedClassroom) {
            const err = new Error('Classroom not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ updatedClassroom });
    } catch (err) {
        next(err);
    }
};

const deleteClassroomById = async (req, res, next) => {
    const { classroomId } = req.params;
    try {
        const deletedClassroom = await Classroom.findByIdAndDelete(classroomId);
        if (!deletedClassroom) {
            const err = new Error('Classroom not found!');
            err.status = 404;
            throw err;
        }
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};

// Add a leader/support/student to a classroom
const addUserToClassroomById = async (req, res, next) => {
    // In Postman use Query Params: [key, value] = [role, leader/support/student]
    const { classroomId } = req.params;
    const { role } = req.query;
    const { userId } = req.body;
    try {
        // Check valid role
        if (!["leader", "support", "student"].includes(role)) {
            const err = new Error('Invalid role');
            err.status = 400;
            throw err;
        }

        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            const err = new Error('Classroom not found!');
            err.status = 404;
            throw err;
        }

        // Check if user exists in classroom
        const isExistInClassroom = classroom[`${role}s`].includes(userId);
        if (isExistInClassroom) {
            const err = new Error(`User as ${role} exists in classroom`);
            err.status = 400;
            throw err;
        }

        // Add user to classroom
        classroom[`${role}s`].push(userId);
        const addedUserToClassroom = await classroom.save();

        res.status(201).json({ message: `User added as ${role} to classroom`, addedUserToClassroom });
    } catch (err) {
        next(err);
    }
}

// Delete a leader/support/student from a classroom
const deleteUserFromClassroomById = async (req, res, next) => {
    // In Postman use Query Params: [key, value] = [role, leader/support/student]
    const { classroomId } = req.params;
    const { role } = req.query;
    const { userId } = req.body;
    try {
        // Check valid role
        if (!["leader", "support", "student"].includes(role)) {
            const err = new Error('Invalid role');
            err.status = 400;
            throw err;
        }

        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            const err = new Error('Classroom not found!');
            err.status = 404;
            throw err;
        }

        // Check if user exists in classroom
        const isExistInClassroom = classroom[`${role}s`].includes(userId);
        if (!isExistInClassroom) {
            const err = new Error(`User as ${role} don't exists in classroom`);
            err.status = 404;
            throw err;
        }

        // Delete user to classroom
        classroom[`${role}s`].remove(userId);
        const deletedUserFromClassroom = await classroom.save();

        res.status(200).json({ message: `User deleted as ${role} to classroom`, deletedUserFromClassroom });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getClassrooms,
    getClassroomById,
    createClassroom,
    updateClassroomById,
    deleteClassroomById,
    addUserToClassroomById,
    deleteUserFromClassroomById
}
