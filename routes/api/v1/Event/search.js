var express = require('express');
var Event = require('../../../../models/Event');
let UserEvent = require('../../../../models/UserEvent');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken').verifyJWTToken;

router.get('/:keyword', async function (req, res) {
  let keyword = req.params.keyword;
  let docs;

  try {
    docs = await Event.find({ $text: { $search: keyword } });
  }
  catch (err) {
    return res.status(500);
  }
  finally { //TODO: 404 if event wasn't found but amazingly doesn't work!
    return res.status(200).send(JSON.stringify({ data: docs }));
  }
});

module.exports = router;