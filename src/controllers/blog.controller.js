const Blog = require("../models/blog.model");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await Blog.find().populate("author");
  res.status(200).json({
    blogs,
  });
});

const getBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId).populate("author");

  if (!blog) {
    throw new ApiError("Blog not found!", 404);
  }

  res.status(200).json({
    blog,
  });
});

const createBlog = catchAsync(async (req, res) => {
  const rawBlog = req.body;
  const { title, content, author } = rawBlog;

  if (!title || !content || !author) {
    throw new ApiError("Tile or content author is required", 400);
  }

  rawBlog.image = req.file?.filename;

  const newBlog = await Blog.create(rawBlog);

  res.status(201).json({
    newBlog,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const rawBlog = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, rawBlog, {
    new: true,
  });

  if (!updatedBlog) {
    throw new ApiError("Blog not found", 404);
  }

  res.status(200).json({
    updatedBlog,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;

  const deletedBlog = await Blog.findByIdAndDelete(blogId);

  if (!deletedBlog) {
    throw new ApiError("Blog not found!", 404);
  }

  res.status(204).json();
});

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
