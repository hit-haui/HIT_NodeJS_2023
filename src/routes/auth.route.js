const express = require("express");
const validate = require("../middlewares/validate");
const multer = require("multer");

const dest = "uploads/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: storage });

const { Register, Login } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.route("/register").post(upload.single("avatar"), Register);

authRouter.route("/login").post(Login);

module.exports = authRouter;
