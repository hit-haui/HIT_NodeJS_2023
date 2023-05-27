const express = require("express");

const {
    getBlogs,
    createBLog,
    deleteBLog,
    updateBLog,
    getBlog
} = require("../controllers/Blog.controller");

const classroomRouter = express.Router();


classroomRouter.route('/').get(getBlogs).post(createBLog)
   

classroomRouter.route('/:blogId').get(getBlog).put(updateBLog).delete(deleteBLog)
 

classroomRouter.route('/:classroomId/user')
    

module.exports = classroomRouter;