const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: String,
  sid: String,
  active: { type: Boolean, default: true }
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

UserSchema.index({ username: 'text', firstName: 'text', lastName: 'text' });

module.exports = mongoose.model('User', UserSchema);
