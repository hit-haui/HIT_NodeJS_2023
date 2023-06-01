const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = (
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const blog = mongoose.model("Blog", blogSchema)
module.exports = blog