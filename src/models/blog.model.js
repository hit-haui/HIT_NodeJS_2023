const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogSchema = new Schema({});
const Blog = mongoose.model("blog", BlogSchema);
module.exports = {
  Blog,
};
