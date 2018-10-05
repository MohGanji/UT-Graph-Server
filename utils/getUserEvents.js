let UserEvent = require('../models/UserEvent');
let Event = require('../models/Event');
let normalizeImage = require('./normalizeImage');

exports.getUserEvents = async function (user, role) {
  let userId = user._id;
  let docs, events;

  docs = await UserEvent.find({ user: userId, role: role });
  events = await Promise.all(
    docs.map(async function (doc) {
      let event = await Event.findOne({ _id: doc.event });
      event.role = doc.role;
      return event;
    })
  );
  var mappedEvents = await Promise.all(
    events.map(async function (event) {
      return normalizeImage(event.toJSON());
    })
  );
  return mappedEvents;
};