var express = require('express');
var router = express.Router();
var user = require('./User');
var event = require('./Event');
var notification = require('./Notification');
var sponser = require('./Sponser');
var auth = require('./Auth');

router.use('/user', user);
router.use('/event', event);
router.use('/notification', notification);
router.use('/sponser', sponser);
router.use('/auth', auth);

module.exports = router;
