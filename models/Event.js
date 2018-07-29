const mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  title: { type: String, required: true },
  beginTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  organizer: { type: String, required: true },
  description: String,
  particpants: [String]
});

module.exports = mongoose.model('Event', EventSchema);
