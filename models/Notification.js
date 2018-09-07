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
  hasBottun: { type: Boolean, default: false }
});

NotificationSchema.methods.toJSON = function () {
  var obj = this.toObject();
  return obj;
};

NotificationSchema.pre('save', function (next) {
  if (this.type == "REQUEST")
    this.hasBottun = true;
  next();
});

module.exports = mongoose.model('Notification', NotificationSchema);
