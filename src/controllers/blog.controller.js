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
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      const err = new Error("Blog not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      blog,
    });
  } catch (err) {
    next(err);
  }
};

const creatBlog = async (req, res, next) => {
  try {
    const newBlog = req.body;
    if (!newBlog.title) {
      const err = new Error("Information is not enough");
      err.status = 401;
      throw err;
    }
    const creatBlog = await Blog.create(newBlog);
    res.status(200).json({
      creatBlog,
    });
  } catch (err) {
    next(err);
  }
};
const updateBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blogRaw = req.body;

    const updateBlog = await Blog.findByIdAndUpdate(blogId, blogRaw);
    if (!updateBlog) {
      const err = new Error("Blog not found");
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
  try {
    const { blogId } = req.params;
    const deleteBlog = await Blog.findByIdAndDelete(blogId);
    if (!deleteBlog) {
      const err = new Error("Blog not found");
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
  creatBlog,
  updateBlog,
  deleteBlog,
};
