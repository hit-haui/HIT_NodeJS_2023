const Blog = require("../models/blogs.model");
const getBlogs = async (req, res) => {
  const blog = await Blog.find();
  res.json({
    blog,
  });
};
const getBlog = async (req, res) => {
  const { blogId } = req.param;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(401).json({
      mgs: "Blog not found",
    });
  }
  res.json({
    blog,
  });
};
const createBlog = async (req, res) => {
  const newBlog = req.body;
  const blog = await Blog.create(newBlog);
  res.json({
    blog,
  });
};

const updateBlog = async (req, res) => {
  const { blogId } = req.params;
  const blogRaw = req.body;
  // Update user
  const updatedBlog = await User.findByIdAndUpdate(blogId, blogRaw);
  // Check user
  if (!updatedBlog) {
    Message: "Blog not found!";
  }
  // Send back the updated user info to client
  res.status(200).json({
    updatedBlog,
  });
};
const deleteBlog = (req, res) => {};
module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
