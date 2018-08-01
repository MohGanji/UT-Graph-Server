var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var router = express.Router();

router.post('/', async function (req, res) {
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
