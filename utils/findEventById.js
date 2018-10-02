let Event = require('../models/Event');

module.exports = async function findEventById (id) {
  let event = await Event.findOne({ _id: id });
  return event.toJSON();
};
