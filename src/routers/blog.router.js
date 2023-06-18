const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const {
    getBlogs,
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blog.controller');

const blogRouter = express.Router();

blogRouter.route('/')
    .get(getBlogs)
    .post(authMiddleware, upload, createBlog)

blogRouter.route('/:blogId')
    .get(getBlog)
    .put(authMiddleware, updateBlog)
    .delete(authMiddleware, deleteBlog)

module.exports = blogRouter;
