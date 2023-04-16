const express = require("express");
const userRouter = require("./routes/user.route");

const app = express();
const port = 8080;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});