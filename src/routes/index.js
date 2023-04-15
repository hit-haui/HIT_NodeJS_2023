const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");

const routes = [
  {
    path: "/users",
    route: userRoutes,
  },
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
