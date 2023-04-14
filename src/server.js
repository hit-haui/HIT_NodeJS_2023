const express = require("express");
const app = express();
const port = 8080;
const router = require("./routes/user.route");

// app.get("/", (req, res) => {
//   res.send("Hello Hưng 🙄");
// });
app.use(express.urlencoded());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
