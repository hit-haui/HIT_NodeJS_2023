const Blog = require('../models/blog.model');
const AppError = require('../middlewares/appError');

const asyncHandler = require('../middlewares/asyncHandler');


const getBlogs = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.find().populate(['author']);
    res.status(200).json({
        blogs
    });
});


const getBlog = asyncHandler(async (req, res, next) => {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId).populate(['author']);
    if (!blog) {
        throw new AppError('Blog not found', 404);
    }
    res.status(200).json({
        blog
    });
});


const createBlog = asyncHandler(async (req, res, next) => {
    const rawBlog = req.body;
    const { title, content } = rawBlog;
    if (!title || !content) {
        throw new AppError('Title or content is required!', 400);
    }
    const imageFiles = req.files;
    const images = imageFiles.map(file => file.filename);
    rawBlog.images = images;
    const newBlog = await Blog.create(rawBlog);
    res.status(201).json({
        newBlog
    });
});


const updateBlog = asyncHandler(async (req, res, next) => {
    const { blogId } = req.params;
    const newBlog = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, newBlog);
    if (!updatedBlog) {
        throw new AppError('Blog not found', 404);
    }
    res.status(200).json({
        updatedBlog
    });
});


const deleteBlog = asyncHandler(async (req, res, next) => {
    const { blogId } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
        throw new AppError('Blog not found', 404);
    }
    res.status(204).json();
});


module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}
