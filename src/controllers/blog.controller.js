const Blog = require("../models/blog.model");

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            blogs
        });
    } catch (error) {
        json.status(500).json({
            message: error.message
        });
    }
}

const getBlog = async (req, res) => {
    const { blogId } = req.params;

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            throw Error('Blog not found!');
        }
        res.status(200).json({
            blog
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const createBlog = async (req, res) => {
    const rawBlog = req.body;
    const { title, content } = rawBlog;

    try {
        if (!title || !content) {
            throw Error('Title or content is required!');
        }

        const newBlog = await Blog.create(rawBlog);

        res.status(201).json({
            newBlog
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateBlog = async (req, res) => {
    const { blogId } = req.params;
    const rawBlog = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, rawBlog, { new: true });

        if (!updatedBlog) {
            throw Error('Blog not found!');
        }

        res.status(200).json({
            updatedBlog
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const deleteBlog = async (req, res) => {
    const { blogId } = req.params;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            throw Error('Blog not found!');
        }

        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}
