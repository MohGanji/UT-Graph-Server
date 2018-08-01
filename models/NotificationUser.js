const mongoose = require('mongoose');

var NotificationUserSchema = mongoose.Schema({
  message: String,
  user: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: new Date() },
  read: Boolean
});

NotificationUserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj._id;
  return obj;
};

module.exports = mongoose.model('NotificationUser', NotificationUserSchema);
