const Blog = require("../models/Blog.model")

const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ blogs});
    }
    catch (err) {
        msg: "error"
    }
}

const getBlog = async (req, res, next)  =>{
    
}

const  createBLog = async (req, res, next) => {
    
}

const updateBLog = async (req, res, next) => {
    
}

const deleteBLog= async (req, res, next)=>{
    
}
module.exports= {
    getBlogs,
    createBLog,
    deleteBLog,
    updateBLog,
    getBlog
}