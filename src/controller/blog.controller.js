const Blog = require("../model/blog.model");
const getBlogs = async (req, res) => {
  const Blogs = await Blog.find();
  try {
    if (!Blogs) {
      res.status(404).json({
        message: "Blog not found",
      });
    }
    res.status(200).json({ Blogs });
  } catch (err) {
    res.status(404).json({
      message: "Blog not found",
    });
  }
};
const getBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({
        message: "Blog not found",
      });
    }
    res.status(200).json({ blog });
  } catch (err) {
    res.status(404).json({
      message: "Blog not found",
    });
  }
};
const createBlog = async (req, res) => {
  const blogCreated = req.body;
  console.log(blogCreated);
  try {
    const blog = await Blog.create(blogCreated);
    res.status(200).json({ blog });
  } catch (err) {
    res.status(500).json({ message: "Blog ko dc khoi tao" });
  }
};
const updateBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const updateBlog = req.body;
    if (!blogId) {
      res.status(404).json({
        message: "BlogId not exist!",
      });
    }
    const bolgUpdated = Blog.findByIdAndUpdate(blogId, updateBlog, {
      new: true,
    });
    if (!bolgUpdated) {
      res.status(404).json({
        message: "Blog not found",
      });
    }
    res.json({ updateBlog });
  } catch (err) {
    res.status(400).json({
      message: "Update thất bại",
    });
  }
};
const deleteBlogById = async (req, res) => {
  const { blogId } = req.params;
  if (!blogId) {
    res.status(404).json({
      message: "Blog not found",
    });
  }
  try {
    const bolgDeleted = await Blog.findByIdAndDelete(blogId);
    if (!bolgDeleted) {
      res.status(404).json({
        message: "Blog not found",
      });
    }
    res.status(200).json({
      bolgDeleted,
    });
  } catch (err) {
    res.status(404).json({
      message: "Blog not found",
    });
  }
};
module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
};
