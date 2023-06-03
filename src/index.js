const express = require("express");
const router = require("./routes");

const app = express();
const port = 8080;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
