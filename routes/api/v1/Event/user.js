var express = require('express');
let UserEvent = require('../../../../models/UserEvent');
let User = require('../../../../models/User');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/:username', async function (req, res) {
  let username = req.params.username;
  let user = await User.findOne({ username: username });
  let userId = user._id;
  let docs;

  try {
    docs = await UserEvent.find({ user: userId });
  }
  catch (err) {
    return res.status(500);
  }
  finally { //TODO: 404
    return res.status(200).send(JSON.stringify({ data: docs }));
  }
});

module.exports = router;