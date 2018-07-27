var express = require('express');
var router = express.Router();
var user = require('./User');
var event = require('./Event');
var auth = require('./Auth');

router.use('/user', user);
// router.use('/event', event);
// router.use('/auth', auth);

module.exports = router;
