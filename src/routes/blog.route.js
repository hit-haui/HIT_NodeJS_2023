const express = require("express");
const multer = require("multer");
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage: storage }).single("image");

const blogRouter = express.Router();

blogRouter.route("/").get(getBlogs).post(upload, createBlog);

blogRouter.route("/:blogId").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = blogRouter;
