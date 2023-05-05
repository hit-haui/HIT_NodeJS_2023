const Classrooms = require('../models/class.model')

const getClassroom = async (req, res, next) => {
  try {
    const classrooms = await Classrooms.find().populate([
      'leaders',
      'supports',
      'students',
    ])
    return res.status(200).json(classrooms)
  } catch (err) {
    next(err)
  }
}

const getClassroomById = async (req, res, next) => {
  const { classId } = req.params
  try {
    const classroom = await Classrooms.findById(classId).populate([
      'leaders',
      'supports',
      'students',
    ])
    if (!classroom) {
      const err = new Error('Classroom not found')
      err.status = 404
      throw err
    } else {
      res.status(200).json(classroom)
    }
  } catch (err) {
    next(err)
  }
}

const createClassroom = async (req, res, next) => {
  const newClassroom = req.body
  try {
    const classroom = await Classrooms.create(newClassroom)
    res.status(200).json(classroom)
  } catch (err) {
    next(err)
  }
}

const updateClassroom = async (req, res, next) => {
  const { classId } = req.params
  const updateClassroom = req.body
  try {
    const classroom = await Classrooms.findByIdAndUpdate(
      classId,
      updateClassroom
    ).populate(['leaders', 'supports', 'students'])
    if (!classroom) {
      const err = new Error('Classroom not found')
      err.status = 404
      throw err
    } else {
      return res.status(200).json(classroom)
    }
  } catch (err) {
    next(err)
  }
}

const deleteClassroom = async (req, res, next) => {
  const { classId } = req.params
  try {
    const classroom = await Classrooms.findByIdAndDelete(classId)
    if (!classroom) {
      const err = new Error('Classroom not found')
      err.status = 404
      throw err
    } else {
      return res.status(200).json(classroom)
    }
  } catch (err) {
    next(err)
  }
}

const addUserToClassroom = async (req, res, next) => {
  const { classId } = req.params
  const { userId, role } = req.body
  try {
    if (!['leaders', 'supports', 'students'].includes(role)) {
      const err = new Error('Not have access')
      err.status = 404
      throw err
    }
    const classroom = await Classrooms.findById(classId)
    if (!classroom) {
      const err = new Error('Classroom not found')
      err.status = 404
      throw err
    }
    const checkUserExist = classroom[`${role}s`].includes(userId)
    if (checkUserExist) {
      const err = new Error('User already exists in the class')
      err.status = 404
      throw err
    }
    classroom[`${role}s`].push(Object(userId))
    const newUser = await Classrooms.save()
    return res.status(200).json(newUser)
  } catch (err) {
    next(err)
  }
}

const deleteUserInClass = async (req, res, next) => {
  const { classId } = req.params
  const { userId, role } = req.body
  try {
    if (!['leaders', 'supports', 'students'].includes(role)) {
      const err = new Error('Not have access')
      err.status = 404
      throw err
    }
    const classroom = await Classrooms.findById(classId)
    if (!classroom) {
      const err = new Error('Classroom not found')
      err.status = 404
      throw err
    }
    const checkUserExist = classroom[`${role}s`].includes(userId)
    if (!checkUserExist) {
      const err = new Error('User does not already exists in the class')
      err.status = 404
      throw err
    }
    classroom[`${role}s`].remove(userId)
    const deleteUser = await Classrooms.save()
    return res.status(200).json(deleteUser)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getClassroom,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  addUserToClassroom,
  deleteUserInClass,
}
