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

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "..", "..", "..", "..", "public", "uploads"));
  },
  filename: function (req, file, callback) {
    console.log(1);
    console.log(file);
    // console.log(req);
    callback(null, file.fieldname + "_" + uuid.v4() + "_" + file.originalname);
  }
});

var upload = multer({
  storage: Storage
})
  .array("file", 5000); //Field name and max count


// router.post('/', upload.single('file'), (req, res) => {
//   console.log("upload!");
//   res.send();
//   // upload(req, res, function (err) {
//   //   if (err) {
//   //     console.log(err);
//   //     res.status(300);
//   //     return res.end("Something went wrong!");
//   //   }
//   //   console.log("ok");
//   //   res.status(200);
//   //   return res.end("File uploaded sucessfully!.");
//   // });
// });


router.post('/', isAuthenticated, async function (req, res) {
  let username = req.username;
  console.log(username);
  // console.log(req.headers);
  // console.log(req.query);//username
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      res.status(300);
      return res.end("Something went wrong!");
    }
    console.log("ok");
    res.status(200);
    return res.end("File uploaded sucessfully!.");
  });
});
// router.use(fileUpload());
// router.post('/', (req, res, next) => {
//   console.log(req.body);
//   // let imageFile = req.body.file;
//   let imageFile = req.body.file;
//   console.log("123");
//   imageFile.mv(path.join(__dirname, "..", "..", "..", "..", "public", "uploads/")
//     + uuid.v4() + `${req.body.filename}.jpg`, function (err) {
//       if (err) {
//         console.log(err);
//         return res.status(500).send(err);
//       }

//       res.json({
//         file: path.join(__dirname, "..", "..", "..", "..", "public", "uploads/")
//           + `${req.body.filename}.jpg`
//       });
//     });

// })

module.exports = router;
