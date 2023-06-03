const express = require("express");
const blogRouter = express.Router();

const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

blogRouter.route("/").get(getBlogs).post(createBlog);

blogRouter.route("/blogId").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = blogRouter;
