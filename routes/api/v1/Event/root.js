var express = require('express');
var Event = require('../../../../models/Event');
var User = require('../../../../models/User');
let UserEvent = require('../../../../models/UserEvent');
let Notification = require('../../../../models/Notification');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;
var mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
let findIdByUsername = require('../../../../utils/findIdByUsername');

router.get('/', async function (req, res) {
  let pageToken = req.query.pageToken;
  let time;

  if (pageToken) {
    let decodedToken = await Buffer.from(pageToken, 'base64').toString('ascii');
    let decodedTokenNumber = Number(decodedToken);
    time = new Date(decodedTokenNumber);
  } else {
    time = new Date();
  }

  let events;
  try {
    events = await Event
      .find({ "createTime": { $lt: time } }) //TODO: change to find({ "createTime": { $gt: time } })
      .sort({ 'createTime': -1 })
      .limit(8)
  }
  catch (err) {
    return res.status(500).send();
  }

  var mappedEvents = await Promise.all(
    events.map(async function (event) {
      return await event.toJSON();
    }),
  );

  let lastPageTime;
  let lastPageToken;
  if (events.lentgh > 0) {
    lastPageTime = events[events.length - 1].createTime.getTime().toString();
    lastPageToken = await Buffer.from(lastPageTime).toString('base64');
  }

  res.status(200).send(JSON.stringify({ data: mappedEvents, pageToken: lastPageToken }));
});

router.post('/', isAuthenticated, [
  check('data.title', "Event title is too short!").isLength({ min: 6 }),
  check('data.title', "Event title is too long!").isLength({ max: 64 }),
  check('data.description', "Event description is too long!").isLength({ max: 1000 }),
  check('req.username').custom(async (value, { req }) => {
    console.log(req.username);
    console.log(value);
    let user = await User.findOne({ username: req.username });
    if (!user) {
      throw new Error('Organizer user not found!');
    }
  }),
  // check('data.beginTime').custom(async value => {
  //   let currentTime = new Date();
  //   let beginTime = new Date(value);
  //   if (currentTime.getMilliseconds() > beginTime.getMilliseconds()) {
  //     throw new Error('Beginning time of event is past!');
  //   }
  // })
], async function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("error");
    return res.status(422).json({ errors: errors.array() });
  }
  console.log(validationResult(req).array());

  let title = req.body.data.title;
  let beginTime = new Date(req.body.data.beginTime); //ok?
  let endTime = new Date(req.body.data.endTime);
  let createTime = new Date();
  let organizer = req.username;
  let description = req.body.data.description;
  let location = req.body.data.location;
  let user = await User.findOne({ username: organizer });
  let userId = user._id;

  let newEvent = await Event.create({
    title: title,
    beginTime: beginTime,
    endTime: endTime,
    organizer: organizer,
    description: description,
    location: location,
    createTime: createTime
  }).catch(err => res.status(500).send());

  let eventId = newEvent._id;

  await UserEvent.create({
    user: userId,
    event: eventId,
    role: 'ORGANIZER',
    date: new Date(),
  });

  return res.status(200).send();
});

router.get('/:id', async function (req, res) {
  let id = req.params.id;
  let event;
  try {
    event = await Event.findOne({ _id: id });
    return res.status(200).send(JSON.stringify({ data: event.toJSON() }));
  } catch (err) {
    return res.status(500).send();
  }
});

router.get('/:id/participants', async function (req, res) {
  let eventId = mongoose.Types.ObjectId(req.params.id);
  let docs, users;

  try {
    docs = await UserEvent.find({ event: eventId });
    users = await Promise.all(
      docs.map(async function (doc) {
        return await User.findOne({ _id: doc.user }); //is it okay to return user?
      }),
    );
    return res.status(200).send(JSON.stringify({ data: users }));
  } catch (err) {
    return res.status(500);
  }
});

router.put('/:id', isAuthenticated, async function (req, res) {
  var id = req.params.id;
  var event = await Event.findById(id);
  var updatedEvent = req.body.data;

  if (event.organizer != req.username) {
    return res.status(401).send();
  }

  await Event.findByIdAndUpdate(id, { $set: updatedEvent });

  return res.status(200).send();
});

router.post('/:id/signup_staff', isAuthenticated, async function (req, res) {
  let username = req.username;
  let user = await User.findOne({ username: username });
  let userId = user._id;
  let eventId = req.params.id;
  let event = await Event.findOne({ _id: eventId });

  await Notification.create({
    user: await findIdByUsername(event.organizer),
    read: false,
    type: 'REQUEST',
    applicant: await findIdByUsername(username),
    event: eventId,
  });

  return res.status(200).send();
});

router.post('/:id/signup_attendent', isAuthenticated, async function (req, res) {
  let username = req.username;
  let user = await user.findOne({ username: username });
  let userId = user._id;
  let eventId = req.params.id;

  await UserEvent.create({
    user: userId,
    event: eventId,
    role: 'ATTENDENT',
    date: new Date(),
  });
  return res.status(200).send();
});

// router.delete('/:id', isAuthenticated, async function(req, res) {
//   let username = req.username;
//   let id = req.params.id;
//   let event = await findById(id);

//   if (event.username != username) {
//     return res.status(401).send();
//   } else {
//     await Event.findByIdAndDelete(id);
//     await UserEvent.remove({ event: event._id });
//   }
// });
module.exports = router;
