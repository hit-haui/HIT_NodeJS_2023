const Blog = require("../model/blog.model");
const getBlogs = async (req, res,next) => {
  const Blogs = await Blog.find();
  try {
    if (!Blogs) {
       const err = new Error("Blog not found");
       err.status = 404;
       throw err;
    }
    res.status(200).json({ Blogs });
  } catch (err) {
    next(err);
  }
};
const getBlogById = async (req, res,next) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
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
const createBlog = async (req, res,next) => {
  const blogCreated = req.body;
  try {
    if (blogCreated.author) {
      const err = new Error("Author is exist!");
      err.status = 404;
      throw err;
    }
    const blog = await Blog.create(blogCreated);
    res.status(201).json({ blog });
  } catch (err) {
    next(err);
  }
};
const updateBlogById = async (req, res,next) => {
  const { blogId } = req.params;
  try {
    const updateBlog = req.body;
    if (!blogId) {
      const err = new Error("BogId is not exist!");
      err.status = 404;
      throw err;
    }
    const bolgUpdated = Blog.findByIdAndUpdate(blogId, updateBlog, {
      new: true,
    });
    if (!bolgUpdated) {
      const err = new Error("BogId is not found!");
      err.status = 404;
      throw err;
    }
    res.json({ updateBlog });
  } catch (err) {
    next(err);
  }
};
const deleteBlogById = async (req, res,next) => {
  const { blogId } = req.params;
  console.log(blogId);
  if (!blogId) {
    const err = new Error("BogId not found!");
    err.status = 404;
    throw err;
  }
  try {
    const bolgDeleted = await Blog.findByIdAndDelete(blogId);
    if (!bolgDeleted) {
      const err = new Error("Bog not found!");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      bolgDeleted,
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
