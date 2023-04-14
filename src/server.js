const express = require("express");
const app = express();
const port = 8080;
const usersRouter = require("./routes/user.route");

app.use(express.json());

app.use(usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
