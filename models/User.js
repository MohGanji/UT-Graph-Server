const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: String,
  sid: String,
  image: String,
  active: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ['USER', 'ADMIN']
  }
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

UserSchema.index({ username: 'text', firstName: 'text', lastName: 'text' });

module.exports = mongoose.model('User', UserSchema);
