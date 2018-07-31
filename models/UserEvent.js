const mongoose = require('mongoose');

var UserEventSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  event: mongoose.Schema.Types.ObjectId,
  date: Date
});

module.exports = mongoose.model('UserEvent', UserEventSchema);
