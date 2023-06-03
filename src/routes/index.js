const express = require("express");
const router = express.Router();

const blogRouter = require("./blog.route");
const userRouter = require("./user.route");

const routes = [
  {
    path: "/blogs",
    route: blogRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
