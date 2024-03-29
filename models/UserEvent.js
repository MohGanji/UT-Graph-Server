const mongoose = require('mongoose');

var UserEventSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  role: {
    type: String,
    enum: ['STAFF', 'ATTENDENT', 'ORGANIZER', 'STUDENT']
  },
  event: mongoose.Schema.Types.ObjectId,
  date: Date,
  job: String
});

module.exports = mongoose.model('UserEvent', UserEventSchema);
