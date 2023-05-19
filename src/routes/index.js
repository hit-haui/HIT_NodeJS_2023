const express = require("express");
const router = express.Router();
const userRouter = require("./user.route");
const classroomRouter = require("./classroom.route");
const login = require("../controllers/auth.controller");

const routes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/classrooms",
    route: classroomRouter,
  },
  {
    path: "/login",
    route: login,
  },
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
