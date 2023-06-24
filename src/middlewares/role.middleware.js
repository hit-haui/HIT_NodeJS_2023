const roles = (requestAllow) => (req, res, next) => {
  if (!requestAllow.includes(req.user.role)) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
  next();
};
module.exports = roles;
//authentication:=> auth middelware
// xac thuc user da dang nhap hay chua
//authorication: => role middleware
//phan quyen co duoc vao route user hay k
// user nay duoc truy cap vao route nay duoc nhung k duonc vao route kia
