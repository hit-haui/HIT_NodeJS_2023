const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        name: {
            Type: String,
            
        },
        password:{
            Type: String
            
        },
        
    }

)


const Blog = mongoose.model("Blogs", BlogSchema)
module.exports = Blog