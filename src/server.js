const express = require("express");
const app = express();
const port = 8081;
const path = require("path");
const router = require("./routes/index");
const userRouter = require("./routes/user.route");
const mongoose = require("mongoose");
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
app.use(userRouter);
mongoose
  .connect("mongodb://127.0.0.1:27017/hit_nodejs")
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
