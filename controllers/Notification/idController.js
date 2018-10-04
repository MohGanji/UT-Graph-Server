var Notification = require('../../models/Notification');
var User = require('../../models/User');
var Event = require('../../models/Event');
var UserEvent = require('../../models/UserEvent');

exports.acceptById = async function (req, res) {
  var username = req.username;
  var user, notification, notificationId;
  let userApplicant;
  var event;
  try {
    user = await User.findOne({ username: username });

    notificationId = req.params.id;
    notification = await Notification.findOneAndUpdate(
      { _id: notificationId },
      { $set: { hasButton: false, off: true } }
    );

    event = await Event.findById(notification.event);
    userApplicant = await User.findOne({ username: notification.applicant });
  } catch (err) {
    return res.status(500).send();
  }

  if (event.organizer !== user.username) {
    return res.status(401).send();
  } else {
    await UserEvent.create({
      user: userApplicant._id,
      event: event,
      role: 'STAFF',
      date: new Date(),
      job: notification.job
    });

    await Notification.create({
      user: notification.applicant,
      read: false,
      type: 'ACCEPT',
      event: notification.event,
      index: await Notification.find({}).count(),
      job: notification.job
    });

    return res.status(200).send();
  }
};

exports.rejectById = async function (req, res) {
  var username = req.username;
  var user, notification, notificationId;
  let event;

  try {
    user = await User.findOne({ username: username });

    notificationId = req.params.id;
    notification = await Notification.findOneAndUpdate(
      { _id: notificationId },
      { $set: { hasButton: false, off: true } }
    );
    event = await Event.findById(notification.event);
  } catch (err) {
    return res.status(500).send();
  }

  if (event.organizer !== user.username) {
    return res.status(401).send();
  } else {
    await Notification.create({
      user: notification.applicant,
      read: false,
      type: 'REJECT',
      event: notification.event,
      index: await Notification.find({}).count()
    });

    return res.status(200).send();
  }
};

exports.getNotificationById = async function (req, res) {
  // @hadi Are you aware that this function never ever executes??
  var username = req.username;
  try {
    var user = await User.findOne({ username: username });
    var userId = user._id;

    var notificationId = req.params.id;
    var notification = await Notification.findById(notificationId);
  } catch (err) {
    return res.status(500).send();
  }

  if (notification.user !== userId) {
    return res.status(401).send();
  } else {
    return res.status(200).send(JSON.stringify({ data: notification }));
  }
};

// exports.deleteNotificationById = async function(req, res) {
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
// };
