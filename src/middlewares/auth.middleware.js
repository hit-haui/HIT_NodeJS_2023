const authMiddleware = (req, res, next) => {
  const permission = req.body.permission;
  if (permission !== "admin") {
    const error = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }
  next();
};
module.exports = authMiddleware;
