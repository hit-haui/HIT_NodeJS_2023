const AppError = require('./appError')

const roles = (rolesAllow) => (req, res, next) => {
    if (!rolesAllow.includes(req.user.role)) {
        return next(new AppError('Unauthorized', 401));
    }
    next();
}

module.exports = roles;

// authentication: xác thực người dùng đã đăng nhập hay chưa, có phải user hệ thống hay không có thì cho chìa khòa JWT
// authorization: user được phân quyền gì, được truy cập hay không? => role middleware
