const express = require("express");

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
} = require("../controller/blog.controller");

const blogRoute = express.Router();

blogRoute.route("/").get(getBlogs).post(createBlog);

blogRoute
  .route("/:blogId")
  .get(getBlogById)
  .put(updateBlogById)
  .delete(deleteBlogById);

module.exports = blogRoute;
