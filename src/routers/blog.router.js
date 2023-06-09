const express = require('express');
const multer = require('multer');

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
    .post(upload, createBlog)

blogRouter.route('/:blogId')
    .get(getBlog)
    .put(updateBlog)
    .delete(deleteBlog)

module.exports = blogRouter;
