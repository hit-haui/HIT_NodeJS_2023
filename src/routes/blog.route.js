const express = require("express");
const {
  getBlogs,
  getBlog,
  creatBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const blogRouter = express.Router();
blogRouter.route("/").get(getBlogs).post(creatBlog);

blogRouter.route("/:blogId").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = blogRouter;
