const express = require("express");

const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.controller");

const blogRoute = express.Router();

blogRoute.route("/blogs").get(getBlogs).post(createBlog);

blogRoute
  .route("/blogs/:blogId")
  .get(getBlog)
  .put(updateBlog)
  .delete(deleteBlog);

module.exports = blogRoute;
