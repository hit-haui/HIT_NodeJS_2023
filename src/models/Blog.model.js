const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        name: {
            Type: String,
            required: true
        },
        Date:{
            Type: Date,
            required: true
        },

    }

)

const Blog = mongoose.model("Blogs", BlogSchema)
module.exports = Blog