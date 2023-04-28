const authMiddleware = (req, res, next) => {
  // In Postman use Query Params: [key, value] = [permission, admin]
  let { permission } = req.query;
  if (permission !== "admin") {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
  next();
};

module.exports = authMiddleware;
