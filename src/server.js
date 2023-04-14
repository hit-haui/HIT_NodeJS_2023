const express = require("express");
const app = express();
const port = 8080;
const routes = require("./routes");
app.use(routes);
app.get("/", (req, res) => {
  res.send("Hello Hưng 🙄");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
