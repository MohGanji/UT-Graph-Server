var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var router = express.Router();
var validate = require('express-validation');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var RegisterValidation = require('../../../../middlewares/validation/user/register');

router.post('/', validate(RegisterValidation), async function (req, res) {
  console.log("hi");
  let username = req.body.data.username;
  let newUser = req.body.data;

  let user = await User.findOne({ username: username });
  if (user) {
    return res.status(400).send();
  }

  try {
    await User.create(newUser)
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }

  return res.status(200).send();
});

module.exports = router;
