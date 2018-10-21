let mongoose = require('mongoose');
let Event = require('../models/Event');
let Sponser = require('../models/Sponser');

module.exports = async function getEventSponsers (id) {
  let eventId = mongoose.Types.ObjectId(id);
  let event = await Event.findById(eventId);
  let docs = event.sponsers;
  let sponsers;

  sponsers = await Promise.all(
    docs.map(async function (doc) {
      let sponser = await Sponser.findById(doc);
      return sponser.toJSON();
    })
  );

  return sponsers;
};
