var mongoose = require('mongoose');
var User = require('../../models/User');
var Event = require('../../models/Event');
var UserEvent = require('../../models/UserEvent');
var Notification = require('../../models/Notification');

exports.getEvent = async function (req, res) {
  let id = req.params.id;
  let event;
  try {
    event = await Event.findOne({ _id: id });
    return res.status(200).send(JSON.stringify({ data: event.toJSON() }));
  } catch (err) {
    return res.status(500).send();
  }
};

exports.editEvent = async function (req, res) {
  var id = req.params.id;
  var event = await Event.findById(id);
  var updatedEvent = req.body.data;

  if (event.organizer !== req.username) {
    return res.status(401).send();
  }

  await Event.findByIdAndUpdate(id, { $set: updatedEvent });

  return res.status(200).send();
};

exports.getEventParticipants = async function (req, res) {
  let eventId = mongoose.Types.ObjectId(req.params.id);
  let docs, users;

  try {
    docs = await UserEvent.find({ event: eventId });
    users = await Promise.all(
      docs.map(async function (doc) {
        return User.findOne({ _id: doc.user });
      })
    );
    return res.status(200).send(JSON.stringify({ data: users }));
  } catch (err) {
    return res.status(500);
  }
};

exports.signupStaff = async function (req, res) {
  let username = req.username;
  let eventId = req.params.id;
  let event = await Event.findOne({ _id: eventId });

  await Notification.create({
    user: event.organizer,
    read: false,
    type: 'REQUEST',
    hasButton: true,
    applicant: username,
    event: event.title,
    index: await Notification.find({}).count()
  });

  return res.status(200).send();
};

exports.signupAttendent = async function (req, res) {
  let username = req.username;
  let user = await User.findOne({ username: username });
  let userId = user._id;
  let eventId = req.params.id;

  await UserEvent.create({
    user: userId,
    event: eventId,
    role: 'ATTENDENT',
    date: new Date()
  });
  return res.status(200).send();
};
