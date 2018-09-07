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
  .array("event", 5000); //Field name and max count

router.use('/search', search);
router.use('/', root);

router.post('/upload/:id', isAuthenticated, async function (req, res) {
  var id = req.params.id;
  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      res.status(300);
      return res.end("Something went wrong!");
    }
    await Event.findByIdAndUpdate(id, { 'image': file_name });
    console.log("ok");
    res.status(200);
    return res.end("File uploaded sucessfully!.");
  });
});


// router.post('/upload', isAuthenticated, async function (req, res) {
//   console.log(path.join(__dirname, "..", "..", "..", "..", "public", "uploads"));
//   let username = req.username;
//   console.log(username);
//   // console.log(req.headers);
//   // console.log(req.query);//username
//   upload(req, res, async function (err) {
//     if (err) {
//       console.log(err);
//       res.status(300);
//       return res.end("Something went wrong!");
//     }
//     await Event.findOneAndUpdate({ organizer: username }, { 'image': file_name });
//     console.log("ok");
//     res.status(200);
//     return res.end("File uploaded sucessfully!.");
//   });
// });


module.exports = router;
