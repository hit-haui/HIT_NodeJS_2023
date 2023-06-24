const roles = (rolesAllow) => (req, res, next) => {
  if (!rolesAllow.includes(req.user.role)) {
    const err = new Error(Unauthorized);
    err.status = 401;
    throw err;
  }
  next();
};

module.exports = roles;
