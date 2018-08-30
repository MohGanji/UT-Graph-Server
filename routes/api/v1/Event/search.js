var express = require('express');
var Event = require('../../../../models/Event');
let UserEvent = require('../../../../models/UserEvent');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken').verifyJWTToken;

router.get('/:keyword', async function (req, res) {
  let keyword = req.params.keyword;
  let docs;

  if (keyword.length < 2) {
    return res.status(404).send();
  }

  try {
    docs = await Event.find({
      "$or": [
        { "title": { $regex: ".*" + keyword + ".*" } },
        { "description": { $regex: ".*" + keyword + ".*" } },
        { "organizer": { $regex: ".*" + keyword + ".*" } }
      ]
    });
  }
  catch (err) {
    return res.status(500).send();
  }

  if (docs.length == 0) {
    return res.status(404).send();
  }
  else {
    return res.status(200).send(JSON.stringify({ data: docs }));
  }
});

module.exports = router;