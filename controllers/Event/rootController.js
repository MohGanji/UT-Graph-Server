var Event = require('../../models/Event');
var User = require('../../models/User');
let UserEvent = require('../../models/UserEvent');
var jalaali = require('jalaali-js');
const { validationResult } = require('express-validator/check');

exports.getEventsByType = async function (req, res) {
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
  let type = req.params.type;
  let currentDateObject = jalaali.toJalaali(new Date());
  let currentDate = new Date(
    currentDateObject.jy,
    currentDateObject.jm - 1,
    currentDateObject.jd - 1
  );

  try {
    if (type === 'old') {
      events = await Event.find({
        createTime: { $lt: time },
        endTime: { $lt: currentDate },
        active: 'true'
      })
        .sort({ createTime: -1 })
        .limit(6);
    } else if (type === 'new') {
      events = await Event.find({
        createTime: { $lt: time },
        endTime: { $gte: currentDate },
        active: 'true'
      })
        .sort({ createTime: -1 })
        .limit(6);
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    return res.status(500).send();
  }

  var mappedEvents = await Promise.all(
    events.map(async function (event) {
      return event.toJSON();
    })
  );

  let lastPageTime;
  let lastPageToken;
  if (events.length !== 0) {
    lastPageTime = events[events.length - 1].createTime.getTime().toString();
    lastPageToken = await Buffer.from(lastPageTime).toString('base64');
  }
  res
    .status(200)
    .send(JSON.stringify({ data: mappedEvents, pageToken: lastPageToken }));
};

exports.createEvent = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let title = req.body.data.title;
  let beginTime = new Date(req.body.data.beginTime);
  let endTime = new Date(req.body.data.endTime);
  let createTime = new Date();
  let organizer = req.username;
  let description = req.body.data.description;
  let location = req.body.data.location;
  let user = await User.findOne({ username: organizer });
  let userId = user._id;
  let capacity = req.body.data.capacity;

  let newEvent = await Event.create({
    title: title,
    beginTime: beginTime,
    endTime: endTime,
    organizer: organizer,
    description: description,
    location: location,
    createTime: createTime,
    image: 'defaultEvent.svg',
    capacity: capacity
  }).catch(() => res.status(500).send());

  let eventId = newEvent._id;

  await UserEvent.create({
    user: userId,
    event: eventId,
    role: 'ORGANIZER',
    date: new Date()
  });

  return res.status(200).send(JSON.stringify({ data: eventId }));
};
