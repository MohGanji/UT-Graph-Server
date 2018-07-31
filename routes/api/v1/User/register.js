var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var router = express.Router();

router.post('/', async function (req, res) {
  let username = req.body.data.username;
  let password = req.body.data.password;
  let firstName = req.body.data.firstName;
  let lastName = req.body.data.lastName;
  let email = req.body.data.email;

  let user = await User.findOne({ username: username });

  if (user) {
    return res.status(400).send();
  } else {
    await User.create(
      {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    ).catch((err) => res.status(500).send());
  }
  return res.status(200).send();
});

module.exports = router;
