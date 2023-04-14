const express = require("express");
const userRouter = require("./routes/user.route");

const app = express();
const port = 3000;
const host = 'localhost';

app.use(express.json());
app.use(userRouter);

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`);
});