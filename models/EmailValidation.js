const mongoose = require('mongoose');

var EmailValidationSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  hash: String
});

module.exports = mongoose.model('EmailValidation', EmailValidationSchema);
