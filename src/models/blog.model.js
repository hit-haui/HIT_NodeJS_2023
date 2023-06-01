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
            required: true
        },
        author: {
            type: String,
            default: 'Author'
        },

        images: [{ type: String }],
        comments: [{ type: String }]
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;