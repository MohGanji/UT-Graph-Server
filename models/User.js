const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: String,
  sid: String,
  image: { type: String, default: '' },
  active: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['USER', 'ADMIN']
  },
  bio: { type: String, default: '' },
  refreshToken: { type: String, default: '' }
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.refreshToken;
  return obj;
};

UserSchema.post('init', doc => {
  if (doc.image !== '' && doc.image.substring(0, 7) !== 'http://') {
    doc.image = process.env.PUBLIC_URL + doc.image;
  }
});

UserSchema.index({ username: 'text', firstName: 'text', lastName: 'text' });

module.exports = mongoose.model('User', UserSchema);
