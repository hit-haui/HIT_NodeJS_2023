const roles =
  (...rolesAllowed) =>
  (req, res, next) => {
    if (!rolesAllowed.includes(req.user.role)) {
      const error = new Error("You are not authorized to access this route");
      error.status = 401;
      throw error;
    }
    next();
  };
module.exports = roles;
