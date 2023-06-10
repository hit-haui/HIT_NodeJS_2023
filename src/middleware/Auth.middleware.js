const User = require('../models/User.model')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) =>{
    const authorization = req.headers.authorization;
    try{
        if(!authorization){
            const err = new Error("Unauthorizator")
            err.status = 401
            throw err
        }
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token,process.env.SECRET_KEY )
        const userId = payload.userId
        const user = await User.findById(userId)
        if(!user) {
            const err = new Error("User not exist")
            err.status = 404
            throw(err)
        }
        if(user.role !== 'admin'){
            const err = new Error("Forbidden!")
            err.status = 404
            throw(err)
        }
        req.user = user
        next()

    }catch(error){
        next(error)
    }

}

module.exports = authMiddleware;