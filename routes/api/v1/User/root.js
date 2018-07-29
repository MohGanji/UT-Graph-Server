var express = require('express');
var User = require('../../../../models/User');
var router = express.Router();

router.get('/', function (req, res) {

  User.find({}).exec(function (err, users) {
    var mappedUsers = users.map(function (user) {
      return user.toJSON();
    });

    res.status(200).send("{ \"data:\" " + JSON.stringify(mappedUsers) + "}");
  });
});
module.exports = router;
