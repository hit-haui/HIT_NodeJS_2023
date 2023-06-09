const Blog = require("../models/blog.model");

const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate('author');
        res.status(200).json({
            blogs
        });
    } catch (error) {
        next(error);
    }
}

const getBlog = async (req, res, next) => {
    const { blogId } = req.params;

    try {
        const blog = await Blog.findById(blogId).populate('author');

        if (!blog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({
            blog
        });
    } catch (error) {
        next(error);
    }
}

const createBlog = async (req, res, next) => {
    const rawBlog = req.body;
    const { title, content, author } = rawBlog;

    try {
        if (!title || !content || !author) {
            const err = new Error('Title or content or author is required!');
            err.status = 400;
            throw err;
        }

        rawBlog.image = req.file.filename;

        const newBlog = await Blog.create(rawBlog);

        res.status(201).json({
            newBlog
        });
    } catch (error) {
        next(error);
    }
}

const updateBlog = async (req, res, next) => {
    const { blogId } = req.params;
    const rawBlog = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, rawBlog, { new: true });

        if (!updatedBlog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }

        res.status(200).json({
            updatedBlog
        });
    } catch (error) {
        next(error);
    }
}

const deleteBlog = async (req, res, next) => {
    const { blogId } = req.params;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }

        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}
