var express = require('express');
var router = express.Router();
var user = require('./User');
var event = require('./Event');
var notification = require('./Notification');

router.use('/user', user);
router.use('/event', event);
router.use('/notification', notification);

module.exports = router;
