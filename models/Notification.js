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
  hasBottun: Boolean
});

NotificationSchema.methods.toJSON = function () {
  var obj = this.toObject();
  if (obj.type == "REQUEST")
    obj.hasBottun = true;
  else
    obj.hasBottun = false;
  return obj;
};

module.exports = mongoose.model('Notification', NotificationSchema);
