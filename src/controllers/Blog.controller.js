const Blog = require("../models/Blog.model")

const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        if(!blogs){
            throw new Error("Blog not found");
        }
        res.status(200).json({ blogs});
    }
    catch (err) {
        next(err)
    }
}

const getBlog = async (req, res, next)  =>{
    const blogId = req.params;
    try{
        const blog = await Blog.findById(blogId);
        if (!blog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ classroom });
    }catch(err){
        next(err)
    }
}

const  createBLog = async (req, res, next) => {
    const newBlog = req.params;
    try {
        const blog = await Blog.create(newBlog);
        res.status(201).json({ blog });
    }
    catch (err) {
        next(err);
    };
}

const updateBLog = async (req, res, next) => {
     const {blogId} = req.params;
     const newBlog = req.body;

     try{
        const blog = await Blog.findByIdAndUpdate(blogId, newBlog);
        if (!blog) {
            const err = new Error('Blog not found!');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ blog });
     }catch(err){
        next(err);
     }
}

const deleteBLog= async (req, res, next)=>{
    const {blogId} = req.params;

    try{
       const blog = await Blog.findByIdAndDelete(blogId);
       if (!blog) {
           const err = new Error('Blog not found!');
           err.status = 404;
           throw err;
       }
       res.status(200).json({ });
    }catch(err){
       next(err);
    }
}
module.exports= {
    getBlogs,
    createBLog,
    deleteBLog,
    updateBLog,
    getBlog
}