const express = require("express");
const app = express();
const port = 8080;
// const path = require('path');
const userRouter = require("./routes/user.route");
app.get("/", (req, res) => {
  res.send("Hello Hưng 🙄");
});

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
