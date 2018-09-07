var express = require('express');
var User = require('../../../../models/User');
var constLink = require('../../../../utils/config').constLink;

var router = express.Router();

router.get('/', async function (req, res) {
  res.render('forget_page.ejs');
});

router.post('/sent_email', async function (req, res) {
  let email = req.body.email;
  let user = await User.findOne({ email: email });

  let data = user.username;
  let buff = new Buffer(data);
  let base64data = buff.toString('base64');
  const link = constLink + '?user=' + base64data;
});

module.exports = router;
