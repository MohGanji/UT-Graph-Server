var express = require('express');
var router = express.Router();
var root = require('./root');
var login = require('./login');
var register = require('./register');
var reset_password = require('./reset-password');
var forget_password = require('./forget-password');
var search = require('./search');
// var fs = require('fs');
// var base64 = new Buffer(req[body], 'base64');
// fs.writeFile(savePath + filename, base64, function (error) {
// });
const uuid = require('uuid')
const path = require('path');

router.use('/forget_password', forget_password);
router.use('/login', login);
router.use('/register', register);
router.use('/reset_password', reset_password);
router.use('/search', search);

router.use('/', root);
var multer = require('multer');

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "..", "..", "..", "..", "public", "uploads"));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + uuid.v4() + "_" + file.originalname);
  }
});

var upload = multer({
  storage: Storage
}
).array("file", 5000); //Field name and max count

router.post('/upload', async function (req, res) {

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Something went wrong!");
    }
    console.log("ok");
    return res.end("File uploaded sucessfully!.");
  });
});

module.exports = router;