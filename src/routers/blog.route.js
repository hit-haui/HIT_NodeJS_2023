const express = require("express");

const {
    getBlogs,
    createBLog,
    deleteBLog,
    updateBLog,
    getBlog
} = require("../controllers/Blog.controller");

const blogRouter = express.Router();


blogRouter.route('/api/blogs').get(getBlogs).post(createBLog)
   

blogRouter.route('/:blogId').get(getBlog).put(updateBLog).delete(deleteBLog)
    

module.exports = blogRouter;