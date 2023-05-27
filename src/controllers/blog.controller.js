const Blog = require("../models/blog.model");

const getBlogs = async(req, res, next) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            blogs
        });
    } catch (err) {
        next(err);
    }
}

const getBlogById = async (req, res, next) => {
    const { blogId } = req.params;
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({
            blog
        });
    } catch (err) {
        next(err);
    }
};


const createBlog = async (req, res, next) => {
    const newBlog = req.body;
    try {
        if (!newBlog.title || !newBlog.content || !newBlog.author) {
            const err = new Error('Missing required fields!');
            err.status = 400;
            throw err;
        }
        const blog = await Blog.create(newBlog);
        res.status(201).json({
            blog
        });
    } catch (err) {
        next(err);
    }
};


const updateBlogById = async (req, res, next) => {
    const { blogId } = req.params;
    try {
        const blogRaw = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogRaw, { new: true });
        if (!updatedBlog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({
            updatedBlog
        });
    } catch (err) {
        next(err);
    }
};


const deleteBlogById = async (req, res, next) => {
    const { blogId } = req.params;
    try {
        const deletedBlog = await User.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({
            deletedBlog
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlogById,
    deleteBlogById
};
