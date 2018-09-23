const mongoose = require('mongoose');

var ResetPasswordSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  hash: String
});

module.exports = mongoose.model('ResetPasswordRequest', ResetPasswordSchema);
