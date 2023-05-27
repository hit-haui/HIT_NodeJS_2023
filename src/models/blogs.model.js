const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
  },
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
