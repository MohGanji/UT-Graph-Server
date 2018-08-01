var express = require('express');
var User = require('../../../../models/User');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken').verifyJWTToken;

router.post('/', isAuthenticated, async function (req, res) {
  let username = req.username;
  let newPassword = req.body.data.password;

  await User.findOneAndUpdate({ username: username }, { $set: { password: newPassword } });
  return res.status(200).send();
})
module.exports = router;