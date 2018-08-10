var express = require('express');
let UserEvent = require('../../../../models/UserEvent');
let User = require('../../../../models/User');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/:id', async function (req, res) {
  let id = mongoose.Schema.Types.ObjectId(req.params.id);
  let docs, usernames;

  try {
    docs = await UserEvent.find({ _id: id });

    usernames = await Promise.all(
      docs.map(async function (doc) {
        return doc.username;
      }),
    );
  }
  catch (err) {
    return res.status(500);
  }
  finally { //TODO: 404
    return res.status(200).send(JSON.stringify({ data: usernames }));
  }
});

module.exports = router;