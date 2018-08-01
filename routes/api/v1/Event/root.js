var express = require('express');
var Event = require('../../../../models/Event');
let UserEvent = require('../../../../models/UserEvent');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken').verifyJWTToken;

router.get('/', async function (req, res) {

  var events = await Event.find({}).catch((err) => res.status(500).send())

  var mappedEvents = await Promise.all(events.map(async function (event) {
    return (await event.toJSON());
  }));

  res.status(200).send(JSON.stringify({ data: mappedEvents }));
});

router.post('/', isAuthenticated, async function (req, res) {

  let title = req.body.data.title;
  let beginTime = new Date(req.body.data.beginTime); //ok?
  let endTime = new Date(req.body.data.endTime);
  let organizer = req.username;
  let description = req.body.data.description;

  await Event.create(
    {
      title: title,
      beginTime: beginTime,
      endTime: endTime,
      organizer: organizer,
      description: description,
    }
  ).catch((err) => res.status(500).send());

  return res.status(200).send();
});

router.get('/:id', async function (req, res) {
  let id = req.params.id;
  let event;
  try {
    event = await Event.findOne({ _id: id });
  }
  catch (err) {
    return res.status(500).send();
  }
  finally {
    return res.status(200).send(JSON.stringify({ data: event.toJSON() }));
  }
});

router.put('/:id', isAuthenticated, async function (req, res) {

  var id = req.params.id;
  var updatedEvent = req.body.data;
  updatedEvent.organizer = req.username;

  await Event.findByIdAndUpdate(id, { $set: updatedEvent });

  return res.status(200).send();
});

router.post('/:id/signup', isAuthenticated, async function (req, res) {
  let username = req.username;
  let user = await user.findOne({ username: username });
  let userId = user._id;
  let eventId = req.params.id;
  let event = await Event.findOne({ _id: id });

  await UserEvent.create({
    user: userId,
    event: eventId,
    date: new Date()
  });
  return res.status(200).send();
});

router.delete('/:id', async function (req, res) {
  let username = req.username;
  let id = req.params.id;
  let event = await findById(id);

  if (event.username != username) {
    return res.status(401).send();
  } else {
    await Event.findByIdAndDelete(id);
    await UserEvent.remove({ event: event._id })
  }
})
module.exports = router;
