let User = require('../../models/User');

exports.logout = async function (req, res) {
  let username = req.username;
  let user = await User.findOne({ username: username });
  username.refreshToken = '';
  await user.save();
  return res.status(200).send();
};
