const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    avatar: {
      type: String,
      default: "https://anh.vn",
    },
    content: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;