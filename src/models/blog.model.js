const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  content: {
    type: String,
  },
});
const Blog = mongoose.model("Blog", blogsSchema);
module.exports = Blog;
