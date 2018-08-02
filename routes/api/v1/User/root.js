var express = require('express');
var User = require('../../../../models/User');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken').verifyJWTToken;

router.get('/', async function (req, res) {

  var users = await User.find({}).catch((err) => res.status(500).send());
  var mappedUsers = await Promise.all(users.map(async function (user) {
    return await user.toJSON();
  }));

  res.status(200).send(JSON.stringify({ data: mappedUsers }));
});

router.get('/:id', async function (req, res) {
  let username = req.params.id;

  var user = await User.findOne({ username: username }).catch((err) => res.status(500).send());

  if (user) {
    return res.status(200).send(JSON.stringify({ data: user.toJSON() }));
  }
  else {
    return res.status(404).send();
  }
});

router.put('/', isAuthenticated, async function (req, res) {
  let username = req.username;
  let updatedUser = req.body.data;

  await User.findOneAndUpdate({ username: username }, { $set: updatedUser });
  return res.status(200).send();
});

router.patch('/:activationStatus', isAuthenticated, async function (req, res) { //TODO: add to auth? why not?
  let username = req.username;
  let activationStatus = req.params.activationStatus;
  let user = await User.findOne({ username: username });

  if (activationStatus == 'active') {
    user.active = true;
  }
  else if (activationStatus == 'deactive') {
    user.active = false;
  }
  else {
    return res.status(404).send();
  }
  await user.save();

  return res.status(200).send();
});

module.exports = router;
