var express = require('express');
var mongoose = require('./utils/mongo');
var router = express.Router();
var User = mongoose.model('User');

router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username, password: password }, function(err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    if (!user) {
      return res.status(404).send();
    }
  });
});

module.exports = router;
