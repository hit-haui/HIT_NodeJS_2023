const express = require('express');

const {
	getBlogs,
	getBlog,
	createBlog,
	updateBlog,
	deleteBlog,
} = require('../controllers/blog.controller');

const upload = require('../middlewares/upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const blogRouter = express.Router();

blogRouter
	.route('/')
	.get(getBlogs)
	.post(authMiddleware, roleMiddleware(['user', 'admin']), upload.single('image'), createBlog);

blogRouter
	.route('/:blogId')
	.get(getBlog)
	.put(authMiddleware, roleMiddleware(['user', 'admin']), updateBlog)
	.delete(authMiddleware, roleMiddleware(['user', 'admin']), deleteBlog);

module.exports = blogRouter;
