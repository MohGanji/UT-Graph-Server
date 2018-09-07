var express = require('express');
var User = require('../../../../models/User');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken').verifyJWTToken;
var UserEvent = require('../../../../models/UserEvent');
let Event = require('../../../../models/Event');

router.get('/', async function (req, res) {

  try {
    var users = await User.find({});
  } catch (err) {
    return res.status(500).send();
  }
  var mappedUsers = await Promise.all(users.map(async function (user) {
    return await user.toJSON();
  }));

  res.status(200).send(JSON.stringify({ data: mappedUsers }));
});

router.get('/:id', async function (req, res) {
  let username = req.params.id;

  try {
    var user = await User.findOne({ username: username });
  } catch (err) {
    return res.status(500).send();
  }

  if (user) {
    return res.status(200).send(JSON.stringify({ data: user.toJSON() }));
  }
  else {
    return res.status(404).send();
  }
});
router.get('/get_image/:id', async function (req, res) {
  let username = req.params.id;

  try {
    var user = await User.findOne({ username: username });
  } catch (err) {
    return res.status(500).send();
  }

  if (user) {
    return res.status(200).send(JSON.stringify({ image: user.image }));
  }
  else {
    return res.status(404).send();
  }
});


router.get('/:id/events', async function (req, res) {
  let username = req.params.id;
  let user = await User.findOne({ username: username });

  if (!user) {
    return res.status(404).send();
  }

  let userId = user._id;
  let docs, events;

  try {
    docs = await UserEvent.find({ user: userId });
    events = await Promise.all(
      docs.map(async function (doc) {
        let event = await Event.findOne({ _id: doc.event });
        event.role = doc.role;
        return event;
      }),
    );
  }
  catch (err) {
    return res.status(500);
  }
  finally {
    return res.status(200).send(JSON.stringify({ data: events }));
  }

});

router.put('/', isAuthenticated, async function (req, res) {
  let username = req.username;
  let updatedUser = req.body.data;

  await User.findOneAndUpdate({ username: username }, { $set: updatedUser });
  return res.status(200).send();
});

router.patch('/:activationStatus', isAuthenticated, async function (req, res) {
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
