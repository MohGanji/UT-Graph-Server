var Notification = require('../../models/Notification');
var User = require('../../models/User');
var Event = require('../../models/Event');
var UserEvent = require('../../models/UserEvent');

exports.getStatus = async function (req, res) {
  var username = req.username;
  try {
    var user = await User.findOne({ username: username });
    var userId = user._id;
    var notifications;
    if (req.params.status == 1) {
      notifications = await Notification.find({
        user: user.username,
        read: false
      });
    } else notifications = await Notification.find({ user: user.username });
  } catch (err) {
    return res.status(500).send();
  }

  var mappedNotifications = await Promise.all(
    notifications.map(async function (notif) {
      return await notif.toJSON();
    })
  );

  res.status(200).send(JSON.stringify({ data: mappedNotifications }));
};

exports.markAllAsRead = async function (req, res) {
  let username = req.username;
  try {
    await Notification.update(
      { user: username },
      { $set: { read: true } },
      { multi: true }
    );
  } catch (err) {
    return res.status(500).send();
  }

  return res.status(200).send();
};
