module.exports = (err, res, req, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
  next();
};
