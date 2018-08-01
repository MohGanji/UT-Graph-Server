var express = require('express');
var NotificationUser = require('../../../../models/NotificationUser');
var User = require('../../../../models/User');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken').verifyJWTToken;

router.get('/', isAuthenticated, async function (req, res) {
  var username = req.username;
  var user = await User.findOne({ username: username }).catch((err) => res.status(500).send());
  var userId = user._id;

  var notifications = await NotificationUser.find({ user: userId }).catch((err) => res.status(500).send());
  var mappedNotifications = await Promise.all(notifications.map(async function () {
    return await NotificationUser.toJSON();
  }));

  res.status(200).send(JSON.stringify({ data: mappedNotifications }));
});

router.get('/:id', isAuthenticated, async function (req, req) {
  var username = req.username;
  var user = await User.findOne({ username: username }).catch((err) => res.status(500).send());
  var userId = user._id;
  var notificationId = req.params.id;

  var notification = await NotificationUser.findById(notificationId).catch((err) => res.status(500).send());
  if (notification.user != userId) {
    return res.status(401).send();
  }
  else {
    return res.status(200).send(JSON.stringify({ data: notification }));
  }
});

module.exports = router;