let User = require('../models/User');

async function find (username) {
  let user = await User.findOne({ username: username });
  return user._id;
}

module.exports = find;
