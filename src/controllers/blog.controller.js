const Blog = require('../models/blog.model');

const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate('author');
        res.status(200).json({ blogs });
    }
    catch (err) {
        next(err);
    };
};

const getBlog = async (req, res, next) => {
    const { blogId } = req.params;
    try {
        const blog = await Blog.findById(blogId).populate('author');
        if (!blog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ blog });
    }
    catch (err) {
        next(err);
    };
};

const createBlog = async (req, res, next) => {
    const newBlog = req.body;
    try {
        if (!newBlog.author) {
            const err = new Error('Author is require!');
            err.status = 400;
            throw err;
        }
        const blog = await Blog.create(newBlog);
        res.status(201).json({ blog });
    }
    catch (err) {
        next(err);
    };
};

const updateBlogById = async (req, res, next) => {
    const { blogId } = req.params;
    const newBlog = req.body;
    try {
        if (!newBlog.author) {
            const err = new Error('Author is require!');
            err.status = 400;
            throw err;
        }
        const blog = await Blog.findByIdAndUpdate(blogId, newBlog);
        if (!blog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ blog });
    }
    catch (err) {
        next(err);
    };
};

const deleteBlogById = async (req, res, next) => {
    const { blogId } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(blogId);
        if (!blog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ blog });
    }
    catch (err) {
        next(err);
    };
};

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlogById,
    deleteBlogById
};