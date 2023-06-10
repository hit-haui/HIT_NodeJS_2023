const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  image: [{ type: String }],
  userCode: {
    type: String,
    required: true,
  },
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
