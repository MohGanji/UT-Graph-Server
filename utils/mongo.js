const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/utgraph',
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(err);
    } else console.log('connected');
  },
);

const UserSchema = require('../models/User');

module.exports = mongoose;
