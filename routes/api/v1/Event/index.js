var express = require('express');
var router = express.Router();
var root = require('./root');
var search = require('./search');
var user = require('./user');

router.use('/user', user);
router.use('/search', search);
router.use('/', root);


module.exports = router;
