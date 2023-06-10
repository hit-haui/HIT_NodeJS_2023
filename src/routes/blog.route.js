const express = require("express");
const blogRouter = express.Router();

const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const upload = require("../middlewares/upload.middleware");

blogRouter.route("/").get(getBlogs).post(upload.single("image"), createBlog);

blogRouter.route("/:blogId").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = blogRouter;
