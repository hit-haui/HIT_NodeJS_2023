const express = require("express");
const router = express.Router();
const userRouter = require("./user.route");

const routes = [
  {
    path: "/users",
    route: userRouter,
  },
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
