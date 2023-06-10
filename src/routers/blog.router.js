const express = require("express");

const { getBlogs, createBlog, getBlog, updateBlog, deleteBlog } = require("../controllers/blog.controller");
const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const blogRouter = express.Router();

blogRouter.route('/')
    .get(getBlogs)
    .post([authMiddleware, upload.single('image')], createBlog)

blogRouter.route('/:blogId')
    .get(getBlog)
    .put(authMiddleware, updateBlog)
    .delete(authMiddleware, deleteBlog)

module.exports = blogRouter;
