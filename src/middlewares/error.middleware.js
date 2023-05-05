const errorMiddleware = (error, req, res, next) => {
  return res.status(error.status || 500).json({
    err: error.message,
  });
};

module.exports = errorMiddleware;
