var express = require('express');
var Notification = require('../../../../models/Notification');
var User = require('../../../../models/User');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;

router.get('/:status', isAuthenticated, async function (req, res) {
  var username = req.username;
  try {
    var user = await User.findOne({ username: username });
    var userId = user._id;
    var notifications;
    if (req.params.status == 1)
      notifications = await Notification.find({ user: user.username, read: false });
    else
      notifications = await Notification.find({ user: user.username });
  } catch (err) {
    return res.status(500).send();
  }

  var mappedNotifications = await Promise.all(
    notifications.map(async function (notif) {
      return await notif.toJSON();
    }),
  );

  res.status(200).send(JSON.stringify({ data: mappedNotifications }));
});

router.post('/read-all', isAuthenticated, async function (req, res) {
  let username = req.username;
  console.log(username);
  try {
    await Notification.update(
      { user: username },
      { $set: { read: true } },
      { "multi": true }
    );
  } catch (err) {
    return res.status(500).send();
  }

  return res.status(200).send();
})

//   GET /:id/accept

router.post('/:id/accept', isAuthenticated, async function (req, res) {
  var username = req.username;
  var user, userId, notification, notificationId;

  try {
    user = await User.findOne({ username: username });
    userId = user._id;

    notificationId = req.params.id;
    notification = await Notification.findById(notificationId);
  } catch (err) {
    return res.status(500).send();
  }

  if (notification.event.organizer != user.username) {
    return res.status(401).send();
  } else {

    await UserEvent.create({
      user: notification.applicant,
      event: notification.event,
      role: 'STAFF',
      date: new Date(),
    });

    await Notification.create({
      user: notification.applicant,
      read: false,
      type: 'ACCEPT',
      event: notification.event,
    });

    return res.status(200).send();
  }
});

router.get('/:id', isAuthenticated, async function (req, res) {
  var username = req.username;
  try {
    var user = await User.findOne({ username: username });
    var userId = user._id;

    var notificationId = req.params.id;
    var notification = await Notification.findById(notificationId);
  } catch (err) {
    return res.status(500).send();
  }

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
