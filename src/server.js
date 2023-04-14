const express = require("express");
const userRouter = require("./routes/user.route");
const webRouter = require("./routes");

const app = express();
const port = 8080;
const host = 'localhost';

app.use(express.json());

app.use(webRouter);

app.use('/api/v1/users', userRouter);

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`);
});