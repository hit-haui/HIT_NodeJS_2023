const express = require("express");
const router = express.Router();
const classroomRouter = require("./classroom.route");
const useRouter = require("./user.route");
const routes = [
  {
    path: "/users",
    route: useRouter,
  },
  {
    path: "/classrooms",
    route: classroomRouter,
  },
];

routes.map((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
