const authMiddleware = (req,res,next) =>{
    // check quyen truy cap
    if(req.body.permission !== 'admin'){
      res.status(403).send("Khong co quyen truy cap");
    }
    else{
        next();
    }
}
module.exports = authMiddleware;
    