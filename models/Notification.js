const mongoose = require('mongoose');

var NotificationSchema = mongoose.Schema({
  message: String,
  user: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: new Date() },
  read: Boolean
});

module.exports = mongoose.model('Notification', NotificationSchema);
