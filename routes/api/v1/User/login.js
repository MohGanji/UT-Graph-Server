var express = require('express');
var mongoose = require('../../../../utils/mongo');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = mongoose.model('User');

var secret = 'SECRET'; //to be changed later **

router.post('/', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);

  User.findOne({ username: username, password: password }, function(err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    if (user) {
      return res.status(404).send();
    } else {
      return res.json({
        token: jwt.sign(
          {
            username: username,
            password: password,
          },
          secret,
          { expiresIn: 60 * 60 },
        ),
      });
    }
  });
});

module.exports = router;
