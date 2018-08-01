var express = require('express');
var router = express.Router();
var user = require('./User');
var event = require('./Event');

router.use('/user', user);
router.use('/event', event);

module.exports = router;
