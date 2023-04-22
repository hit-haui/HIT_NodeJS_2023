const express = require('express')
const mongoose = require('mongoose')
const routerUser = require('./routes/user.route')
require('dotenv').config()

const app = express()

const URI_mongodb =
  process.env.MONGO_DB || 'mongodb://127.0.0.1:27017/BTVN_Buoi6'

const port = process.env.PORT || 8080

mongoose
  .connect(URI_mongodb)
  .then(() => {
    console.log('Connected!')
  })
  .catch((err) => {
    console.log('Error connecting')
  })

app.use(express.json())

app.use('/users', routerUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
