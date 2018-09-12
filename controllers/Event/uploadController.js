var Event = require('../../models/Event');

const uuid = require('uuid');
const path = require('path');
var multer = require('multer');

var fs = require('fs');
var fileName;
var username;
var dir;

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    fileName = file.fieldname + '_' + uuid.v4() + '_' + file.originalname;
    callback(null, fileName);
  }
});

var upload = multer({
  storage: Storage
}).array('event', 5000); // Field name and max count

exports.uploadImage = async function (req, res) {
  var id = req.params.id;
  username = req.query.username;
  dir = path.join(__dirname, '..', '..', 'public', 'uploads', username);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  console.log(username);
  console.log(username);
  console.log(username);
  console.log(username);
  console.log(username);
  console.log(username);

  upload(req, res, async function (err) {
    if (err) {
      res.status(300);
      return res.end('Something went wrong!');
    }
    await Event.findByIdAndUpdate(id, { image: username + '/' + fileName });
    console.log('ok');
    res.status(200);
    return res.end('File uploaded sucessfully!.');
  });
};

// router.post('/upload', isAuthenticated, async function (req, res) {
//   let username = req.username;
//   upload(req, res, async function (err) {
//     if (err) {
//       res.status(300);
//       return res.end("Something went wrong!");
//     }
//     await Event.findOneAndUpdate({ organizer: username }, { 'image': fileName });
//     res.status(200);
//     return res.end("File uploaded sucessfully!.");
//   });
// });
