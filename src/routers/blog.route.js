const express = require("express");
const multer = require("multer");
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
} = require("../controller/blog.controller");
const blogRouter = express.Router();

blogRouter.route("/").get(getBlogs);

blogRouter
  .route("/:blogId")
  .get(getBlogById)
  .put(updateBlogById)
  .delete(deleteBlogById);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});
const upload = multer({ storage: storage });
blogRouter.route("/").post(upload.single("avatar"), createBlog);
module.exports = blogRouter;
