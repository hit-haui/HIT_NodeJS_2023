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
    .get(authMiddleware, getBlogs)
    .post(upload, createBlog)

blogRouter.route('/:blogId')
    .get(getBlog)
    .put(updateBlog)
    .delete(deleteBlog)

module.exports = blogRouter;
