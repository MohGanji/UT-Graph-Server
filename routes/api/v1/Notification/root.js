var express = require('express');
var Notification = require('../../../../models/Notification');
var User = require('../../../../models/User');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;

router.get('/', isAuthenticated, async function(req, res) {
  var username = req.username;
  var user = await User.findOne({ username: username }).catch(err =>
    res.status(500).send(),
  );
  var userId = user._id;

  var notifications = await Notification.find({ user: userId }).catch(err =>
    res.status(500).send(),
  );
  var mappedNotifications = await Promise.all(
    notifications.map(async function() {
      return await Notification.toJSON();
    }),
  );

  res.status(200).send(JSON.stringify({ data: mappedNotifications }));
});

//   GET /:id/accept

router.get('/:id/accept', isAuthenticated, async function(req, req) {
  var username = req.username;
  var user = await User.findOne({ username: username }).catch(err =>
    res.status(500).send(),
  );
  var userId = user._id;

  var notificationId = req.params.id;
  var notification = await Notification.findById(notificationId).catch(err =>
    res.status(500).send(),
  );

  if (notification.event.organizer != userId) {
    return res.status(401).send();
  } else {
    await Notification.create({
      user: notification.applicant,
      read: false,
      type: 'ACCEPT',
      event: notification.event,
    });

    return res.status(200).send(JSON.stringify({ data: notification }));
  }
});

router.get('/:id', isAuthenticated, async function(req, req) {
  var username = req.username;
  var user = await User.findOne({ username: username }).catch(err =>
    res.status(500).send(),
  );
  var userId = user._id;

  var notificationId = req.params.id;
  var notification = await Notification.findById(notificationId).catch(err =>
    res.status(500).send(),
  );

  if (notification.user != userId) {
    return res.status(401).send();
  } else {
    return res.status(200).send(JSON.stringify({ data: notification }));
  }
});

// router.delete('/:id', isAuthenticated, async function(req, res) {
//   //TODO: find a better way to do this!
//   var username = req.username;
//   var user = await User.findOne({ username: username }).catch(err =>
//     res.status(500).send(),
//   );
//   var userId = user._id;
//   var notificationId = req.params.id;

//   var notification = await Notification.findById(notificationId).catch(err =>
//     res.status(500).send(),
//   );
//   if (notification.user != userId) {
//     return res.status(401).send();
//   } else {
//     await notification.remove(); //does it work correctly?
//     return res.status(200).send(JSON.stringify({ data: notification }));
//   }
// });

module.exports = router;
