const mongoose = require('mongoose');

var SponserSchema = mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
  // profile_picture: { type: String, required: true }
});

module.exports = mongoose.model('Sponser', SponserSchema);