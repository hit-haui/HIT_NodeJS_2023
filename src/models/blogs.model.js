const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
      default: "https://static.dhcnhn.vn/student",
    },
    content: {
      type: String,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
