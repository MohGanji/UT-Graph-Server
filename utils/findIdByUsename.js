let User = require("../models/User");
var mongoose = require('mongoose');

function find(username) {
  let user = User.findOne({ username: username });
  return user._id;
}

module.exports = find;