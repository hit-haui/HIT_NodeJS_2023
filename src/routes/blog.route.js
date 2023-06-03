const express = require("express");

const {
    getBlogs,
    getBlog,
    createBlog,
    updateBlogById,
    deleteBlogById
} = require("../controllers/blog.controller");

const blogRouter = express.Router();

blogRouter.route("/")
    .get(getBlogs)
    .post(createBlog);

blogRouter.route("/:blogId")
    .get(getBlog)
    .put(updateBlogById)
    .delete(deleteBlogById);

module.exports = blogRouter;