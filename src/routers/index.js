const express = require("express");
const router = express.Router();
const blogRouter = require('./blog.route.js')
const routes = [
  {
    path: "/blogs",
    route: blogRouter,
  },
];
routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
