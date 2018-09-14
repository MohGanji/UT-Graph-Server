var express = require('express');
var router = express.Router();
var root = require('./root');
var search = require('./search');

router.use('/', root);
router.use('/search', search);

module.exports = router;
