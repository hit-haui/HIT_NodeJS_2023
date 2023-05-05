const authMiddleware = (req, res, next) => {
  // In Postman, provide the 'permission' field in the header of the request by adding a key-value pair
  const { permission } = req.headers;
  if (permission !== "admin") {
    throw {
      message: "One does not have permission to access this resource!",
      status: 400,
    };
  }
  next();
};

module.exports = authMiddleware;
