let UserEvent = require('../models/UserEvent');
let Event = require('../models/Event');

module.exports = async function (user, role) {
  let userId = user._id;
  let docs, events;

  docs = await UserEvent.find({ user: userId, role: role });
  events = await Promise.all(
    docs.map(async function (doc) {
      let event = await Event.findOne({ _id: doc.event });
      let eventObject = await event.toJSON();
      eventObject.role = doc.role;
      eventObject.job = doc.job;
      return eventObject;
    })
  );
  return events;
};
