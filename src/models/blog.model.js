const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  data: {
    type: String,
  },
});
const Blog = mongoose.model("blog", BlogSchema);
module.exports = {
  Blog,
};
