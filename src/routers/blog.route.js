const express = require("express");
const multer = require("multer");

const {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/Blog.controller.js");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +'.jpg')
  },
})
const upload = multer({ storage: storage}).single('image');
const blogRouter = express.Router();

blogRouter.route("/").get(getBlogs).post(upload, createBlog);

blogRouter.route("/:blogId").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = blogRouter;
