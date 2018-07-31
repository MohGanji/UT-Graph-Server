var express = require('express');
var Event = require('../../../../models/Event');
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
  let participants = req.body.data.participants;

  await Event.create(
    {
      title: title,
      beginTime: beginTime,
      endTime: endTime,
      organizer: organizer,
      description: description,
      participants: participants
    },
    function (err) {
      console.log(err);
      return res.status(500).send();
    },
  );
  return res.status(200).send();
});

router.get('/:id', function (req, res) {
  let id = req.params.id;
  Event.findOne({ _id: id }, function (err, event) { //search by which id?? ***NOT COMPLETE***
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (event) {
      return res.status(200).send(JSON.stringify({ data: event.toJSON() }));
    }
    else {
      return res.status(404).send();
    }
  })
});

router.put('/:id', isAuthenticated, function (req, res) {
  let id = req.params.id;
  let title = req.body.data.title;
  let beginTime = new Date(req.body.data.beginTime);
  let endTime = new Date(req.body.data.endTime);
  let organizer = req.username;
  let description = req.body.data.description;
  let participants = req.body.data.participants;

  Event.findOne({ _id: id }, function (err, event) {  //search by which id?? ***NOT COMPLETE***
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (!event) {
      return res.status(404).send();
    }
    else { //it's assumed that all information will be sent
      event.title = title;
      event.beginTime = beginTime;
      event.endTime = endTime;
      event.organizer = organizer;
      event.description = description;
      event.participants = participants;

      event.save(function (err, updatedEvent) {
        if (err) {
          return res.status(500).send();
        }
        res.status(200).send();
      })
    }
  })
})

module.exports = router;
