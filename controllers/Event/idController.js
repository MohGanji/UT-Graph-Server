var mongoose = require('mongoose');
var User = require('../../models/User');
var Event = require('../../models/Event');
var UserEvent = require('../../models/UserEvent');
var Notification = require('../../models/Notification');
var findEventById = require('../../utils/findEventById');
var getEventStaff = require('../../utils/getEventStaff');
var getEventParticipantsCount = require('../../utils/getEventParticipantsCount');
var findUserByUsername = require('../../utils/findUserByUsername');
var getEventSponsers = require('../../utils/getEventSponsers');
var auth = require('../../utils/auth');

exports.getEvent = async function (req, res) {
  let id = req.params.id;
  try {
    let event = await findEventById(id);
    let staff = await getEventStaff(id);
    let participantsCount = await getEventParticipantsCount(id);
    let organizer = await findUserByUsername(event.organizer);
    let sponsers = await getEventSponsers(id);

    let result = {
      data: {
        event: event,
        staff: staff,
        participantsCount: participantsCount,
        organizer: organizer,
        sponsers: sponsers
      }
    };

    let token = req.headers.authorization;

    if (token !== 'null' && typeof token !== 'undefined') {
      let token = req.headers.authorization;
      let decodedUser = await auth.decodeToken(token);
      let user = await findUserByUsername(decodedUser.username);
      let userAsStaffJobs = await UserEvent.find({
        event: id,
        user: user,
        role: 'STAFF'
      });
      let userAsAttendant = await UserEvent.findOne({
        event: id,
        user: user,
        role: 'ATTENDENT'
      });

      result.data.isRegistered = !!userAsAttendant;
      result.data.isAdmin = event.organizer === user.username;
      result.data.userAsStaffJobs = userAsStaffJobs;
    }
    return res.status(200).send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

exports.deleteEvent = async function (req, res) {
  let username = req.username;
  var id = req.params.id;
  try {
    let event = await Event.findOne({ organizer: username, _id: id });
    event.active = false;
    await event.save();
    return res.status(200).send();
  } catch (err) {
    return res.status(404).send();
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

exports.getEventParticipantNumber = async function (req, res) {
  let eventId = mongoose.Types.ObjectId(req.params.id);

  try {
    let participantsNumber = await UserEvent.count({
      event: eventId,
      role: 'ATTENDENT'
    });
    return res.status(200).send(JSON.stringify({ data: participantsNumber }));
  } catch (err) {
    return res.status(500);
  }
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

exports.getEventStaff = async function (req, res) {
  let eventId = mongoose.Types.ObjectId(req.params.id);

  try {
    let docs = await UserEvent.find({ event: eventId, role: 'STAFF' });
    let users = await Promise.all(
      docs.map(async function (doc) {
        let user = await User.findOne({ _id: doc.user });
        return user;
      })
    );
    var mappedUsers = await Promise.all(
      users.map(async function (user) {
        return user.toJSON();
      })
    );
    return res.status(200).send(JSON.stringify({ data: mappedUsers }));
  } catch (err) {
    res.status(500);
  }
};

exports.signupStaff = async function (req, res) {
  let username = req.username;
  let eventId = req.params.id;
  let event = await Event.findOne({ _id: eventId });
  let job = req.body.data.job;

  await Notification.create({
    user: event.organizer,
    read: false,
    type: 'REQUEST',
    hasButton: true,
    applicant: username,
    event: event._id,
    index: await Notification.find({ user: event.organizer }).count(),
    job: job
  });

  return res.status(200).send();
};

exports.signupAttendent = async function (req, res) {
  let username = req.username;
  let user = await User.findOne({ username: username });
  let userId = user._id;
  let eventId = req.params.id;

  let event = await Event.findById(eventId);
  let participantsCount = await getEventParticipantsCount(eventId);
  if (event.capacity === participantsCount) {
    return res.status(422).send();
  }

  let attendent = await UserEvent.findOne({
    user: user._id,
    event: eventId,
    role: 'ATTENDENT'
  });
  if (attendent) {
    return res.status(422).send();
  }

  await UserEvent.create({
    user: userId,
    event: eventId,
    role: 'ATTENDENT',
    date: new Date()
  });
  return res.status(200).send();
};
