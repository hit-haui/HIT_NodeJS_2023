const Blog = require("../models/blogs.model");

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ blogs });
  } catch (err) {
    next(err);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      const err = new Error("Blog cannot found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ blog });
  } catch (err) {
    next(err);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const newBlog = req.body;
    const blog = await Blog.create(newBlog);
    res.status(201).json({
      blog,
    });
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const newBlog = req.body;
    const { blogId } = req.params;
    if (!blogId) {
      const err = new Error("BlogId is required");
      err.status = 401;
      throw err;
    }
    const blogUpdate = await Blog.findByIdAndUpdate(blogId, newBlog);
    res.status(200).json({
      blogUpdate,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      new Error("BlogId is required");
      err.status = 401;
      throw err;
    }
    const blogDelete = await Blog.findByIdAndDelete(blogId);
    res.status(201).json({
      blogDelete,
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
