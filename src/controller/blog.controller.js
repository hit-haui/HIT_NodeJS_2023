const Blog = require("../model/blog.model");
const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("author");
    if (!blogs) {
      const err = new Error("Blog not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ blogs });
  } catch (err) {
    next(err);
  }
};
const getBlogById = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId).populate("author");
    if (!blog) {
      const err = new Error("Blog not found");
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
    const avatar = req.file.path;
    const { content, author, title } = req.body;
    const checkBlog = await Blog.findOne({ author });
    if (checkBlog) {
      const err = new Error("Blog is exist");
      err.status = 400;
      throw err;
    }
    const newBlog = await Blog.create({
      content,
      author,
      title,
      avatar,
    });
    res.status(201).json(newBlog);
  } catch (err) {
    next(err);
  }
};
const updateBlogById = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const updateBlog = req.body;
    if (!blogId) {
      const err = new Error("BogId is not exist!");
      err.status = 404;
      throw err;
    }
    const blogUpdated = Blog.findByIdAndUpdate(blogId, updateBlog, {
      new: true,
    });
    if (!blogUpdated) {
      const err = new Error("BogId is not found!");
      err.status = 404;
      throw err;
    }
    res.json({ updateBlog });
  } catch (err) {
    next(err);
  }
};
const deleteBlogById = async (req, res, next) => {
  const { blogId } = req.params;
  if (!blogId) {
    const err = new Error("BogId not found!");
    err.status = 404;
    throw err;
  }
  try {
    const blogDeleted = await Blog.findByIdAndDelete(blogId);
    if (!blogDeleted) {
      const err = new Error("Blog not found!");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      blogDeleted,
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
  deleteBlogById,
};
