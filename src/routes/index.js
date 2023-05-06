const express = require("express");
const router = express.Router();
const userRouter = require("./user.route");
const classRouter = require('./class.route')
const routes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/classrooms',
    route: classRouter,
  },
]

routes.map((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
