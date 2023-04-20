const express = require("express");
const app = express();
const port = 8080;
const userRouter = require("./routes/user.route");


app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
