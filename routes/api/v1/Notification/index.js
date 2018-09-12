var express = require('express');
var router = express.Router();
var root = require('./root');
var idParam = require('./id');

router.use('/', root);
router.use('/:id', idParam);

module.exports = router;
