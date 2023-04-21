const express = require('express')
const mongoose = require('mongoose')
const routerUser = require('./routes/user.route')
const app = express()
const port = 8080

mongoose
  .connect('mongodb://127.0.0.1:27017/BTVN_Buoi6')
  .then(() => {
    console.log('Connected!')
  })
  .catch((err) => {
    console.log('Error connecting')
  })

app.use(express.json())

app.use('/user', routerUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
