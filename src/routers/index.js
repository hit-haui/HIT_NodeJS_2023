const express = require("express");
const router = express.Router();
const blogRouter= require('./blog.route.js')
const userRouter = require("./user.route.js");
const authRouter = require("./auth.route.js")
const routes = [
  {
    path: "/blogs",
    route: blogRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  }
];
routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
