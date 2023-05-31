const express = require("express")
const dotenv = require("dotenv")
const app = express()

dotenv.config()
const port = process.env.PORT || 3000

app.get("/", function(req, res) {
    res.send("Hello word")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });