var express = require('express');
var router = express.Router();
var version = require('./v1');

router.use('/v1', version);

module.exports = router;
