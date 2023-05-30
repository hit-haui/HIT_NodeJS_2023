# HIT_NodeJS_2023

Bài tập về nhà lớp NodeJS

## Hướng dẫn

- Clone project về máy \
  `git clone https://github.com/hit-haui/HIT_NodeJS_2023.git`
- Tạo nhánh mới theo tên buổi kèm theo tên của mình \
  `git checkout -b btvn-buoi5/dinh-tan-hung`
- Install package và code thôi \
  `npm install` hoặc `npm i`
- Sau khi hoàn thành task push lên nhánh của mình **(Không push lên nhánh main)**

## Còn tiếp ...

# 1

npm init -y

npm i express

npm i nodemon -D

create server.js
const express = require('express')
const app = express()

app.get('/', function (req, res) {
res.send('Hello World')
})

app.listen(3000)

.gitignore
node_modules

# 2 env

create .env
PORT=
create .env.template

npm i dotenv -D

# 3 mongodb

npm i mongoose

setup
const mongoose = require('mongoose');

MONGODB_URI = mongodb://127.0.0.1:27017/test

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected!')).catch(err =>console.log('err'))

### model Blog

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
name: {
type: String,
required: true,
},
image: {
type: String,
},
data: {
type: String,
},
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = {
Blog,
};

# 4

controller
router
=> commit
