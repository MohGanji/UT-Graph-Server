var User = require('../../models/User');
var auth = require('../../utils/auth');
const { validationResult } = require('express-validator/check');

exports.login = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let username = req.body.data.username;
  let user = await User.findOne({ username: username });
  let refreshToken = await auth.createRefreshToken();
  let accessToken = await auth.createAccessToken(user);
  user.refreshToken = refreshToken;
  await user.save();

  return res.json({
    data: { accessToken: accessToken, refreshToken: refreshToken }
  });
};
