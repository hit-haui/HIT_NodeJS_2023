const authMiddleware = (req, res, next) => {
    const { permission } = req.body;
    if (permission != 'admin') {
        const err = new Error('Unauthorized!');
        err.status = 401;
        throw err;
    }
    next();
}

module.exports = authMiddleware;
