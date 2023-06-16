const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorMiddleware = require("./src/middleware/error.middleware");
const blogRoute = require("./src/router/blogs.route");
const userRoute = require("./src/router/user.route");
const authRoute = require("./src/router/auth.route");
const app = express();

dotenv.config();

app.use(express.json());
app.use(blogRoute);
app.use(userRoute);
app.use(authRoute);


const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/KIEM_TRA";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connect database successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
