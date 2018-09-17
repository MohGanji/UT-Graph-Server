const mongoose = require('mongoose');
const jalaali = require('jalaali-js');

var EventSchema = mongoose.Schema({
  title: { type: String, required: true },
  beginTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  organizer: { type: String, required: true },
  description: String,
  createTime: Date,
  location: String,
  image: String,
  isPassed: Boolean,
  active: { type: Boolean, default: true },
  sponsers: { type: Array, default: [] },
  staffs: { type: Array, default: [] }
});

EventSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

EventSchema.post('init', doc => {
  let currentDateObject = jalaali.toJalaali(new Date());
  let currentDate = new Date(
    currentDateObject.jy,
    currentDateObject.jm - 1,
    currentDateObject.jd - 1,
    0,
    0,
    0,
    0
  );
  if (doc.endTime >= currentDate) {
    doc.isPassed = false;
  } else {
    doc.isPassed = true;
  }
});

EventSchema.index({ title: 'text', organizer: 'text', description: 'text' });

module.exports = mongoose.model('Event', EventSchema);
