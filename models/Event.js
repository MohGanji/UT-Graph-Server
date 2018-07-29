const mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  title: { type: String, required: true },
  beginTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  organizer: { type: String, required: true },
  description: String,
  participants: [String]
});

EventSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Event', EventSchema);
