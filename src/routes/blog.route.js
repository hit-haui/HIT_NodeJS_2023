const express = require("express");
const multer = require('multer');

const {
    getBlogs,
    getBlog,
    createBlog,
    updateBlogById,
    deleteBlogById
} = require("../controllers/blog.controller");

const dest = 'uploads/';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, dest);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
	},
});

const upload = multer({ storage });

const blogRouter = express.Router();

blogRouter.route("/")
    .get(getBlogs)
    .post(upload.single("image"), createBlog);

blogRouter.route("/:blogId")
    .get(getBlog)
    .put(updateBlogById)
    .delete(deleteBlogById);

module.exports = blogRouter;