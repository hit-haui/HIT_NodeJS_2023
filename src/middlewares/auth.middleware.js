const authMiddleware = (req, res, next) => {
  // In Postman, provide the 'permission' field in the header of the request by adding a key-value pair
  const { permission } = req.headers;
  if (permission !== "admin") {
    const err = new Error(
      "One does not have permission to access this resource!"
    );
    err.status = 401;
  }
  next();
};

module.exports = authMiddleware;
