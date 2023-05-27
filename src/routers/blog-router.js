const express = require("express");

const { getBlogs, createBlog, getBlog, updateBlog, deleteBlog } = require("../controllers/blog-controller");

const blogRouter = express.Router();

blogRouter.route('/')
    .get(getBlogs)
    .post(createBlog)

blogRouter.route('/:blogId')
    .get(getBlog)
    .put(updateBlog)
    .delete(deleteBlog)

module.exports = blogRouter;
