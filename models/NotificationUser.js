const mongoose = require('mongoose');

var NotificationUserSchema = mongoose.Schema({
  message: String,
  user: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: new Date() },
  read: Boolean
});

module.exports = mongoose.model('NotificationUser', NotificationUserSchema);
