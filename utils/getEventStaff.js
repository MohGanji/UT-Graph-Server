let mongoose = require('mongoose');
let User = require('../models/User');
let UserEvent = require('../models/UserEvent');

module.exports = async function getEventStaff (id) {
  let eventId = mongoose.Types.ObjectId(id);
  let docs, users;

  docs = await UserEvent.find({ event: eventId, role: 'STAFF' });
  users = await Promise.all(
    docs.map(async function (doc) {
      let user = await User.findOne({ _id: doc.user });
      return user.toJSON();
    })
  );

  return users;
};
