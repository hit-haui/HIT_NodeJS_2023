const express = require("express");
const router = express.Router();
const blogRouter = require("../routes/blog.route");
const authRouter = require("../routes/auth.route");

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
