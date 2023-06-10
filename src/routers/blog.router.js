const express = require('express');
const multer = require('multer');

const authMiddleware = require('../middlewares/auth.middleware');

const { 
    getBlogs, 
    createBlog, 
    getBlog, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blog.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    },
});

const upload = multer({ storage: storage }).array('images', 10);

const blogRouter = express.Router();

blogRouter.route('/')
    .get(getBlogs)
    .post(authMiddleware, upload, createBlog)

blogRouter.route('/:blogId')
    .get(getBlog)
    .put(authMiddleware, updateBlog)
    .delete(authMiddleware, deleteBlog)

module.exports = blogRouter;
