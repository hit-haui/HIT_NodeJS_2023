const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const app = express()

dotenv.config()
const port = process.env.PORT || 3000
const mongoURI = process.env.URI_DB || "mongodb://127.0.0.1:27017/Blog_Test"

mongoose
.connect(mongoURI)
.then(() => console.log('Connect database successfully!'))
.catch((err) => {
    console.log(err)
})
app.get("/", function(req, res) {
    res.send("Hello word")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });