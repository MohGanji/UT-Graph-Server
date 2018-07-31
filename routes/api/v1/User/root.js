var express = require('express');
var User = require('../../../../models/User');
var router = express.Router();


router.get('/', async function (req, res) {

  var users = await User.find({}).catch((err) => res.status(500).send());
  var mappedUsers = await Promise.all(users.map(async function (user) {
    return user.toJSON();
  }));

  res.status(200).send(JSON.stringify({ data: mappedUsers }));
});

router.get('/:id', function (req, res) {
  let username = req.params.id;

  User.findOne({ username: username }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    if (user) {
      return res.status(200).send(JSON.stringify({ data: user.toJSON() }));
    }
    else {
      return res.status(404).send();
    }
  });
});

module.exports = router;
