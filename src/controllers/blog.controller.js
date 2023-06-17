const Blog = require("../models/blog.model");
const asyncHandler = require("../middlewares/asyncHandle.middleware");

const handleNonExistBlog = () => {
  const error = new Error("Blog not found!!!");
  error.status = 404;
  throw error;
};

const getBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find().populate({
    path: "authors",
    select: "-password -createdAt -updatedAt -_id",
  });

  res.status(200).json({
    blogs,
  });
});

const getBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId).populate({
    path: "authors",
    select: "-password -createdAt -updatedAt -_id",
  });

  if (!blog) return handleNonExistBlog();

  res.status(200).json({
    blog,
  });
});

const createBlog = asyncHandler(async (req, res, next) => {
  const blogData = req.body;
  const { title, content, authors } = blogData;

  if (!title || !content || !authors) {
    const error = new Error("Invalid input data!");
    error.status = 404;
    throw error;
  }

  // blogData.image = req.file.filename;
  const blog = await Blog.create(blogData);
  res.status(201).json({
    blog,
  });
});

const updateBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.params;
  const updatedData = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, {
    new: true,
  });

  if (!updatedBlog) return handleNonExistBlog();

  res.status(200).json({
    updatedBlog,
  });
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.params;

  const deleteBlog = await Blog.findByIdAndDelete(blogId);

  if (!deleteBlog) return handleNonExistBlog();

  res.status(200).json({
    deleteBlog,
  });
});

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
