const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            default: 'Other'
        },
        author: {
            type: String,
            default: 'Anonymous'
        },
        views: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
