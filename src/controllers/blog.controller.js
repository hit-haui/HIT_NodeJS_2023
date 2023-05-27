const Blog = require("../models/blog.model");
const getBlogs = (req, res, next) => {
  const blogs = Blog.find();
  res.status(200).json({ blogs });
};
const getBlog = (req, res, next) => {};
const createBlog = (req, res, next) => {};
const updateBlog = (req, res, next) => {};
const deleteBlog = (req, res, next) => {};
module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
