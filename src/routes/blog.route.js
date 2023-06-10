const express = require("express");
const blogRouter = express.Router();
const {
  getBlogs,
  getBlog,
  creatBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const upload = require("../upload");

blogRouter.route("/").get(getBlogs).post(upload, creatBlog);
blogRouter.route("/:blogId").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = blogRouter;
