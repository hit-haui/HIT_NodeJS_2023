const Blog = require("../models/blog.model");

const handleNonExistBlog = () => {
  const error = new Error("Blog not found!!!");
  error.status = 404;
  throw error;
};

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate({
      path: "authors",
      select: "-password -createdAt -updatedAt -_id",
    });

    res.status(200).json({
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId).populate({
      path: "authors",
      select: "-password -createdAt -updatedAt -_id",
    });

    if (!blog) return handleNonExistBlog();

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  const blogData = req.body;
  const { title, content } = blogData;

  try {
    if (!title || !content) {
      const error = new Error("Invalid input data!");
      error.status = 404;
      throw error;
    }

    // blogData.image = req.file.filename;
    const blog = await Blog.create(blogData);
    res.status(201).json({
      blog,
    });
  } catch (error) {
    next(error);
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
    next(error);
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
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};

// const extractTokenFromHeader = (request) => {
//   const [type, token] = request.headers.authorization?.split(" ") ?? [];
//   return type === "Bearer" ? token : undefined;
// };
