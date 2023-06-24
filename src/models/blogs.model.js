const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  name: {
    type: String,
    default: null,
    required: true,
  },
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
