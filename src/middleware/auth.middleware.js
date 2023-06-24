const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  // chỉ xác thục, còn quyền các thứ thì viết hàm riêng
  const authorization = req.headers.authorization;
  if (!authorization) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const userId = payload.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // if (user.role !== "admin") {
    //   throw new Error("Forbidden");
    // }
    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authMiddleware;

//authentication:
//xác thực user da dang nhap hay chua
//co dung user co trong he thong hay ko

//authorization  => role Middleware
//phan quyen user, user nay thi duoc truy cap vao/ users
//author: phan quyen user, user nay duoc truy cap vao router / user khong duoc truy cap router khac
