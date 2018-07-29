var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var router = express.Router();

router.post('/', async function(req, res) {
  let username = req.body.data.username;
  let password = req.body.data.password;
  let firstName = req.body.data.firstName;
  let lastName = req.body.data.lastName;
  let email = req.body.data.email;

  await User.findOne({ username: username }, function(err, user) {
    if (user) {
      return res.status(400).send('Duplicate User'); //to be changed later
    } else {
      User.create(
        {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
        function(err) {
          console.log(err);
          return res.status(500).send();
        },
      );
    }
  });
  return res.status(200).send();
});

module.exports = router;
