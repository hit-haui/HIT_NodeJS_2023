// const express = require("express");
// const router = require("./routes");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// const app = express();

// app.use(express.json());
// app.use(router);

// dotenv.config();

// const port = process.env.PORT || 8080;
// const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/hit_nodejs";

// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("Connect database successfully!"))
//   .catch((err) => {
//     console.log(err);
//   });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
const express = require("express");
const app = express();
const port = 8081;
const path = require("path");
const router = require("./routes/index");
const classroomRouter = require("./routes/classroom.route");
const mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/error.middleware");
app.use(express.json());
app.use(router);
// app.use(express.urlencoded()); // form -> urlencoded url
app.use(express.json()); // json -> json
// set folder contain views
app.set("views", path.join(__dirname, "views"));
// set template engine ejs, handlebars, ...
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));
// app.use(router);
app.use(classroomRouter);
mongoose
  .connect("mongodb://127.0.0.1:27017/hit_nodejs")
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

