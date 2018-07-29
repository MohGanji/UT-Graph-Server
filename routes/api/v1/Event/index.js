var express = require('express');
var router = express.Router();
var root = require('./root');

router.use('/', root);

module.exports = router;
