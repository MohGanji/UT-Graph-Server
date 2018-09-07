const mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  title: { type: String, required: true },
  beginTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  organizer: { type: String, required: true },
  description: String,
  createTime: Date,
  location: String,
  role: String,
  image: String,
  // image: { type: Date, default: "default.jpg" },
  staff: [{ username: String, role: String }]
});

EventSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

EventSchema.index({ title: 'text', organizer: 'text', description: 'text' });

module.exports = mongoose.model('Event', EventSchema);
