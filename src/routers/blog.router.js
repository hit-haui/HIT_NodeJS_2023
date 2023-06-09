const express = require("express");

const { getBlogs, createBlog, getBlog, updateBlog, deleteBlog } = require("../controllers/blog.controller");
const upload = require("../middlewares/upload.middleware");

const blogRouter = express.Router();

blogRouter.route('/')
    .get(getBlogs)
    .post(upload.single('image'), createBlog)

blogRouter.route('/:blogId')
    .get(getBlog)
    .put(updateBlog)
    .delete(deleteBlog)

module.exports = blogRouter;
