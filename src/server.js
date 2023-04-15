const express = require("express");
const userRouter = require("./routes/user.route");

const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Hưng 🙄");
});

app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});