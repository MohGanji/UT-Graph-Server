let User = require('../models/User');
let normalizeImage = require('./normalizeImage');

module.exports = async function findUserByUsername (username) {
  let user = await User.findOne({ username: username });
  return normalizeImage(user.toJSON());
};
