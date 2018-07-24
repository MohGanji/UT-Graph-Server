const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = UserSchema;
