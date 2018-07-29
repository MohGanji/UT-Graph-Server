var express = require('express');
var Event = require('../../../../models/Event');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken').verifyJWTToken;

router.post('/', isAuthenticated, async function (req, res) {

  let title = req.body.data.title;
  let beginTime = new Date(req.body.data.beginTime); //ok?
  let endTime = new Date(req.body.data.endTime);
  let organizer = req.body.data.organizer;
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

module.exports = router;
