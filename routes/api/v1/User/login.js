var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var config = require('../../../../utils/config');
var jwt = require('jsonwebtoken');
var router = express.Router();

var secret = config.secret;

router.post('/', async function(req, res) {
  var username = req.body.data.username;
  var password = req.body.data.password;

  var user = await User.findOne({
    username: username,
    password: password,
  }).catch(err => res.status(500).send());

  if (!user) {
    return res.status(404).send();
  } else {
    var authenticationObj = {
      data: {
        token: '',
      },
    };
    authenticationObj.data.token = jwt.sign(
      {
        username: username,
      },
      secret,
      { expiresIn: 60 * 60 },
    );
    return res.json(authenticationObj);
  }
});

module.exports = router;
