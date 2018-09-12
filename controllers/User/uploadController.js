var User = require('../../models/User');
const uuid = require('uuid');
const path = require('path');
var multer = require('multer');
var fs = require('fs');
var dir;
var fileName;

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
}).array('file', 5000); // Field name and max count

exports.uploadImage = async function (req, res) {
  let username = req.username;
  dir = path.join(__dirname, '..', '..', 'public', 'uploads', username);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  console.log(username);
  // console.log(req.headers);
  // console.log(req.query);//username
  upload(req, res, async function (err) {
    if (err) {
      res.status(300);
      return res.end('Something went wrong!');
    }
    await User.findOneAndUpdate(
      { username: username },
      { image: username + '/' + fileName }
    );
    console.log('ok');
    console.log('ok');
    console.log('ok');
    console.log('ok');

    res.status(200);
    return res.end('File uploaded sucessfully!.');
  });
};
