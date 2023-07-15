const Blog = require('../models/blog.model');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const getBlogs = catchAsync(async (req, res) => {
	const { page = 1, sortBy, ...conditions } = req.query;
    const limit = 10;
    const skip = (parseInt(page) > 0) ? (page - 1) * limit : 0;
    let sort = sortBy ? sortBy.split(',').map(sortItem => {
        const [field, option = 'asc'] = sortItem.split(':');
        return [field, option === 'asc' ? 1 : -1];
    }) : [];
	const blogs = await Blog.find(conditions).populate({
		path: 'author',
		select: '-createdAt -updatedAt -__v',
	})
		.limit(limit)
		.skip(skip)
		.lean()
		.sort(sort);
	res.json({
		status: httpStatus.OK,
		message: 'List of blogs retrieved successfully!',
		data: blogs,
	});
});

const getBlog = catchAsync(async (req, res) => {
	const { blogId } = req.params;
	const blog = await Blog.findById(blogId).populate({
		path: 'author',
		select: '-createdAt -updatedAt -__v',
	});
	if (!blog) throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!');
	res.status(httpStatus.OK).json({ blog });
});

const createBlog = catchAsync(async (req, res) => {
	const newBlog = req.body;
	const { title, content } = newBlog;
	if (!title || !content) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Title or content is required!');
	}
	if (!req.user.id) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Author is required!');
	}
	newBlog['author'] = req.user._id;
	const blog = await Blog.create(newBlog);
	// if (!blog.image) blog.image = req.file.filename;
	res.status(httpStatus.CREATED).json({ blog });
});

const updateBlog = catchAsync(async (req, res) => {
	const { blogId } = req.params;
	const newBlog = req.body;
	const blog = await Blog.findByIdAndUpdate(blogId, newBlog);
	if (!blog) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!');
	}
	res.status(httpStatus.OK).json({ user });
});

const deleteBlog = catchAsync(async (req, res) => {
	const { blogId } = req.params;
	const blog = await Blog.finByIdAndDelete(blogId);
	if (!blog) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!');
	}
	res.status(httpStatus.OK).json({ user });
});

module.exports = {
	getBlogs,
	getBlog,
	createBlog,
	updateBlog,
	deleteBlog,
};
