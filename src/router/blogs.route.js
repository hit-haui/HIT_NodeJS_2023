const express = require("express");

const multer = require("multer");

const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.controller");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage }).single("image");

const blogRoute = express.Router();

blogRoute.route("/blogs").get(getBlogs).post(upload, createBlog);

blogRoute
  .route("/blogs/:blogId")
  .get(getBlog)
  .put(updateBlog)
  .delete(deleteBlog);

module.exports = blogRoute;
