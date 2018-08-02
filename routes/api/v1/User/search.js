var express = require('express');
var User = require('../../../../models/User');
var router = express.Router();

router.get('/:keyword', async function (req, res) {
  let keyword = req.params.keyword; //TODO: move search to config functions
  let docs;
  try {
    docs = await User.find({ $text: { $search: keyword } });
  }
  catch (err) {
    return res.status(500);
  }
  finally { //TODO: 404 if event wasn't found but amazingly doesn't work!
    return res.status(200).send(JSON.stringify({ data: docs }));
  }
});

module.exports = router;