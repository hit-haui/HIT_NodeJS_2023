const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            default: null
        },
        content: {
            type: String,
            default: null
        },
        author: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: null
        },
        comment: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;