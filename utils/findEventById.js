let Event = require('../models/Event');
let normalizeImage = require('./normalizeImage');

module.exports = async function findEventById (id) {
  let event = await Event.findOne({ _id: id });
  return normalizeImage(event.toJSON());
};
