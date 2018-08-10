var express = require('express');
var router = express.Router();
var root = require('./root');
var search = require('./search');

router.use('/search', search);
router.use('/', root);


module.exports = router;
