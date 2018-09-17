let mongoose = require('mongoose');
let UserEvent = require('../models/UserEvent');

module.exports = async function getEventParticipantsCount (id) {
  let eventId = mongoose.Types.ObjectId(id);
  let participantsCount = await UserEvent.count({
    event: eventId,
    role: 'ATTENDENT'
  });
  return participantsCount;
};
