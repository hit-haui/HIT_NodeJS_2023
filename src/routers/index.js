const express = require('express');
const blogRouter = require('./blog.router');

const router = express.Router();

const routes = [
    {
        path: '/blogs',
        route: blogRouter,
    },
];

routes.map((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
