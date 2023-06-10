const express = require("express");
const blogRouter = require("./blog.router");
const userRouter = require("./user.router");
const authRouter = require("./auth.router");

const router = express.Router();

const routes = [
    {
        path: '/blogs',
        route: blogRouter,
    },
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/auth',
        route: authRouter,
    }
];

routes.map((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
