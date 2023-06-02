const express = require("express");

const blogRouter = express.Router();
const {getBlogs,getBlogById,createBlog,updateBlogById,deleteBlogById} = require('../controller/blog.controller')
blogRouter.route("/").get(getBlogs).post(createBlog)

blogRouter.route("/:blogId").get(getBlogById).put(updateBlogById).delete(deleteBlogById);
module.exports = blogRouter;
