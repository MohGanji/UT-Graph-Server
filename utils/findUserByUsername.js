let User = require('../models/User');

module.exports = async function findUserByUsername (username) {
  let user = await User.findOne({ username: username });
  return user.toJSON();
};
