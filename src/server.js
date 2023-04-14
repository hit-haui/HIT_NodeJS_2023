const express = require("express");
const app = express();
const router = require('./routes/user.route');
const port = 8080;

app.use(express.urlencoded());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
