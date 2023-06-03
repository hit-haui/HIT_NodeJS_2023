const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("./user.model");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      default: "Other",
    },
    authors: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: "Anonymous",
        required: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
