var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var config = require('../../../../utils/config');
var jwt = require('jsonwebtoken');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken').verifyJWTToken;
const fileUpload = require('express-fileupload');

const uuid = require('uuid')
const path = require('path');
var multer = require('multer');

var file_name;

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "..", "..", "..", "..", "public", "uploads"));
  },
  filename: function (req, file, callback) {
    console.log(1);
    console.log(file);
    // console.log(req);
    file_name = file.fieldname + "_" + uuid.v4() + "_" + file.originalname
    callback(null, file_name);
  }
});

var upload = multer({
  storage: Storage
})
  .array("file", 5000); //Field name and max count

router.post('/', isAuthenticated, async function (req, res) {
  console.log(path.join(__dirname, "..", "..", "..", "..", "public", "uploads"));
  let username = req.username;
  console.log(username);
  // console.log(req.headers);
  // console.log(req.query);//username
  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      res.status(300);
      return res.end("Something went wrong!");
    }
    await User.findOneAndUpdate({ username: username }, { 'image': file_name });
    console.log("ok");
    res.status(200);
    return res.end("File uploaded sucessfully!.");
  });
});

module.exports = router;
