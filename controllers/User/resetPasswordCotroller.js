var User = require('../../models/User');

exports.resetPassword = async function(req, res) {
  let username = req.username;
  let newPassword = req.body.data.password;

  await User.findOneAndUpdate(
    { username: username },
    { $set: { password: newPassword } },
  );
  return res.status(200).send();
};
