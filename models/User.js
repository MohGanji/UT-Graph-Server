const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: string,
  lastName: string,
  email: string,
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
