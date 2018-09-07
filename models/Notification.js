const mongoose = require('mongoose');

var NotificationSchema = mongoose.Schema({
  message: String,
  user: String,
  date: { type: Date, default: new Date() },
  read: Boolean,
  type: {
    type: String,
    enum: ['REQUEST', 'ACCEPT', 'REJECT', 'INFORMATION'],
  },
  applicant: String,
  event: String,
  index: Number,
  hasButton: { type: Boolean, default: false },
  off: { type: Boolean, default: false }
});

NotificationSchema.methods.toJSON = function () {
  var obj = this.toObject();
  return obj;
};

module.exports = mongoose.model('Notification', NotificationSchema);
