var express = require('express');
var router = express.Router();
var root = require('./root');
var search = require('./search');
var Event = require('../../../../models/Event');



var isAuthenticated = require('../../../../middlewares/verifyJWTToken').verifyJWTToken;
const fileUpload = require('express-fileupload');

const uuid = require('uuid')
const path = require('path');
var multer = require('multer');

var fs = require('fs');
var file_name;
var username;
var dir;

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, dir);
  },
  filename: function (req, file, callback) {

    file_name = file.fieldname + "_" + uuid.v4() + "_" + file.originalname
    callback(null, file_name);
  }
});

var upload = multer({
  storage: Storage
})
  .array("event", 5000); //Field name and max count

router.use('/search', search);
router.use('/', root);

router.post('/upload/:id', isAuthenticated, async function (req, res) {
  var id = req.params.id;
  username = req.query.username;
  dir = path.join(__dirname, "..", "..", "..", "..", "public", "uploads", username);

  console.log(username);
  upload(req, res, async function (err) {
    if (err) {
      res.status(300);
      return res.end("Something went wrong!");
    }
    await Event.findByIdAndUpdate(id, { 'image': username + '/' + file_name });
    console.log("ok");
    res.status(200);
    return res.end("File uploaded sucessfully!.");
  });
});


// router.post('/upload', isAuthenticated, async function (req, res) {
//   let username = req.username;
//   upload(req, res, async function (err) {
//     if (err) {
//       res.status(300);
//       return res.end("Something went wrong!");
//     }
//     await Event.findOneAndUpdate({ organizer: username }, { 'image': file_name });
//     res.status(200);
//     return res.end("File uploaded sucessfully!.");
//   });
// });


module.exports = router;
