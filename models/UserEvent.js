const mongoose = require('mongoose');

var UserEventSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  role: {
    type: String,
    enum: ['STAFF', 'ATTENDENT'],
  },
  event: mongoose.Schema.Types.ObjectId,
  date: Date,
});

module.exports = mongoose.model('UserEvent', UserEventSchema);
