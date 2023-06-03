const express = require("express");
const router = express.Router();
const blogRouter = require("./blog.router");
const authRouter = require('./auth.router');

const routes = [
  {
    path: "/blogs",
    route: blogRouter,
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
