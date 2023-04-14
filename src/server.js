const express = require("express");
const path = require("path");
const app = express();
const userRoute = require("../src/routes/user.route");
const port = 8080;

app.use(express.urlencoded());
app.use(express.json()); 

app.use(userRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





