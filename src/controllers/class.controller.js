const Classrooms = require('../models/class.model')

const getClassrooms = async (req, res, next) => {
  try {
    const classrooms = await Classrooms.find({}).populate([
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
    }
    res.status(200).json(classroom)
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

const updateClassroomById = async (req, res, next) => {
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

const deleteClassroomById = async (req, res, next) => {
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

const addUserToClassroomById = async (req, res, next) => {
  const { classroomId } = req.params
  const { role } = req.query
  const { userId } = req.body
  try {
    if (!['leader', 'support', 'student'].includes(role)) {
      const err = new Error('Invalid role')
      err.status = 400
      throw err
    }
    const classroom = await Classroom.findById(classroomId)
    if (!classroom) {
      const err = new Error('Classroom not found!')
      err.status = 404
      throw err
    }
    const isExistInClassroom = classroom[`${role}s`].includes(userId)
    if (isExistInClassroom) {
      const err = new Error(`User as ${role} exists in classroom`)
      err.status = 400
      throw err
    }
    classroom[`${role}s`].push(userId)
    const addedUserToClassroom = await classroom.save()

    res.status(201).json({
      message: `User added as ${role} to classroom`,
      addedUserToClassroom,
    })
  } catch (err) {
    next(err)
  }
}

const deleteUserFromClassroomById = async (req, res, next) => {
  const { classroomId } = req.params
  const { role } = req.query
  const { userId } = req.body
  try {
    if (!['leader', 'support', 'student'].includes(role)) {
      const err = new Error('Invalid role')
      err.status = 400
      throw err
    }
    const classroom = await Classroom.findById(classroomId)
    if (!classroom) {
      const err = new Error('Classroom not found!')
      err.status = 404
      throw err
    }
    const isExistInClassroom = classroom[`${role}s`].includes(userId)
    if (!isExistInClassroom) {
      const err = new Error(`User as ${role} don't exists in classroom`)
      err.status = 404
      throw err
    }
    classroom[`${role}s`].remove(userId)
    const deletedUserFromClassroom = await classroom.save()
    res.status(200).json({
      message: `User deleted as ${role} to classroom`,
      deletedUserFromClassroom,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroomById,
  deleteClassroomById,
  addUserToClassroomById,
  deleteUserFromClassroomById,
}
