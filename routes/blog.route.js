const express = require("express");
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const blogRouter = express.Router();

userRouter.route("/").get(getBlogs).get(createBlog);

userRouter.route("/:blogId").get(getBlogs).put(updateBlog).delete(deleteBlog);

module.exports = blogRouter;
