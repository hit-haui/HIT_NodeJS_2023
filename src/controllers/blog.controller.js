const Blog = require("../models/blog.model");

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      blogs,
    });
  } catch (err) {
    next(err);
  }
};

const getBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      const err = new Error("Blog not found!");
      err.status = 401;
      throw err;
    }
    res.status(200).json({
      blog,
    });
  } catch (err) {
    next(err);
  }
};

const createBlog = async (req, res, next) => {
  const newBlog = req.body;
  try {
    if (!newBlog.title) {
      const err = new Error("title is required");
      err.status = 400;
      throw err;
    }
    const blog = await Blog.create(newBlog);
    res.status(201).json({
      blog,
    });
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const newBlog = req.body;
    const updateBlog = await Blog.findByIdAndUpdate(blogId, newBlog);
    if (!updateBlog) {
      const err = new Error("Blog not found!");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      updateBlog,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const deleteBlog = await Blog.findByIdAndDelete(blogId);
    if (!deleteBlog) {
      const err = new Error("Blog not found!");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      deleteBlog,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
