const authMiddleware = (req, res, next) => {
  const { permission } = req.query;
  if (permission !== "admin") {
    const err = new Error("Unauthorized");
    err.status = 403;
    throw err;
  }
  next();
};

module.exports = authMiddleware;
