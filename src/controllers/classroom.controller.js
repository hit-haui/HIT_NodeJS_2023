const Classroom = require(".././models/classroom.model");

const getClassroom = async (req, res, next) => {
  try {
    const classroom = await Classroom.find().populate([
      "leaders",
      "supports",
      "students",
    ]);
    // .populate('leaders')
    // .populate('supports')
    // .populate('students');
    console.log(classroom);
    if (!classroom) {
      throw new Error("Classroom not found");
    } else {
      res.status(200).json(classroom);
    }
  } catch (err) {
    next(err);
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
      throw new Error("Classroom not found!");
    }
    res.status(200).json({ classroom });
  } catch (err) {
    next(err);
  }
};
const createClassroom = async (req, res, next) => {
  const classroom = req.body;
  try {
    const newClassroom = await Classroom.create(classroom);
    res.status(201).json({
      newClassroom,
    });
  } catch (err) {
    next(err);
  }
};
const deleteClassroomById = async (req, res, next) => {
  // laays id classroom can delete
  const { classroomId } = req.params;

  try {
    // check id exist
    if (!classroomId) {
      throw new Error("Id classroom not exist");
    }
    const classroom = await Classroom.findByIdAndDelete(classroomId);
    res.status(400).json({
      message:"Delete access",
    });
  } catch (err) {
    next(err);
  }
};
const updateClassroomById = async(req,res,next)=>{
    const {classroomId} = req.params;
    const updateClassroom = req.body;
    try{
      if(!classroomId){
        throw new Error("Id classroom not exist")
      }
      const classroom = await Classroom.findByIdAndUpdate(classroomId,updateClassroom);
      res.status(400).json({
        classroom,
      })
    }catch(err){
      next(err);
    }

}
// them 1 user vao leaders, supports,students cua classroom
const addUserToClassroomById = async (req, res, next) => {
  // lấy id lớp học
  const { classroomId } = req.params;
  // lấy dữ liệu nhập
  const { userId } = req.body;
  // lấy tên dữ liệu leader, support, student
  const { userRole } = req.query;
  console.log(userRole);
  // tao 1 mang dl 
  const userRoleArray = ["leader", "support", "student"];
  try {
    // check vai tro nguoi dung
    if (!userRoleArray.include(userRole)) {
      throw new Error("Not access Permission!");
    }
    // tim lop theo id
    const classroom = await Classroom.findById(classroomId);
    if (classroom) {
      throw new Error("Classroom existed!");
    }
    // check user ton tai
    const checkUserExistInClassroom = classroom[`${userRole}s`].include(userId);
    if (!checkUserExistInClassroom) {
      throw new Error("User existed in Classroom");
    }
    // them vao classroom
    classroom[`${userRole}`].delete();
    // theem xong thi luu lai
    const addedUserToClassroom = await classroom.save();
    res.json({
      addedUserToClassroom,
    })
  } catch (err) {
    next(err);
  }
};
const deleteUserToClassroomById = async (req, res, next) => {
  // lấy id lớp học
  const { classroomId } = req.params;
  // lấy dữ liệu nhập
  const { userId } = req.body;
  // lấy tên dữ liệu leader, support, student
  const { userRole } = req.query;
  console.log(userRole);
  // tao 1 mang dl
  const userRoleArray = ["leader", "support", "student"];
  try {
    // check vai tro nguoi dung
    if (!userRoleArray.include(userRole)) {
      throw new Error("Not access Permission!");
    }
    // tim lop theo id
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      throw new Error("Classroom not found!");
    }
    // check user ton tai
    const checkUserExistInClassroom = classroom[`${userRole}s`].include(userId);
    if (!checkUserExistInClassroom) {
      throw new Error("User not exist in Classroom");
    }
    // xoa khoi classroom
     classroom[`${userRole}`].remove(checkUserExistInClassroom);
    // theem xong thi luu lai
    const deleteUserToClassroom = await classroom.save();
    res.status(200).json({
        deleteUserToClassroom,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getClassroom,
  getClassroomById,
  updateClassroomById,
  deleteClassroomById,
  createClassroom,
  addUserToClassroomById,
  deleteUserToClassroomById
};
