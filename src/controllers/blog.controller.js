const Blog = require("../models/blog.model");

const handleNonExistBlog = () => {
  res.status(404).json({
    message: "Blog  not found!",
  });
};

const getBlogs = async (req, res, next) => {
  const blogs = await Blog.find();

  res.status(200).json({
    blogs,
  });
  try {
  } catch (error) {
    res.status(500).json({
      message: `Error getting blogs: ${error.message}`,
    });
  }
};

const getBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);

    if (!blog) return handleNonExistBlog();

    res.status(200).json({
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error getting blog with id ${blogId}: ${error.message}`,
    });
  }
};

const createBlog = async (req, res, next) => {
  const blogData = req.body;
  const { title, content } = blogData;

  if (!title || !content) {
    return res.status(400).json({
      message: "Invalid input data!",
    });
  }

  try {
    const blog = await Blog.create(blogData);
    res.status(201).json({
      blogData,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error creating blog: ${error.message}`,
    });
  }
};
const updateBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const updatedData = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, {
      new: true,
    });

    if (!updatedBlog) return handleNonExistBlog();

    res.status(200).json({
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating blog with id ${blogId}: ${error.message}`,
    });
  }
};
const deleteBlog = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    const deleteBlog = await Blog.findByIdAndDelete(blogId);

    if (!deleteBlog) return handleNonExistBlog();

    res.status(200).json({
      deleteBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting user with id ${id}: ${error.message}`,
    });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
