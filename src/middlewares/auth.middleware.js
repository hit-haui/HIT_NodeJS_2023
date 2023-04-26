const authMiddleware = (req, res, next) => {
    const { permission } = req.query;
    if (permission !== 'admin') {
        throw Object.assign(new Error('Unauthorized'), { status: 403 });
    }
    next();
}

module.exports = authMiddleware;