var express = require('express');
var router = express.Router();
var root = require('./root');
var search = require('./search');
var upload = require('./upload');
var idParam = require('./id');

router.use('/search', search);
router.use('/upload', upload);
router.use('/:id', idParam);
router.use('/', root);

module.exports = router;
