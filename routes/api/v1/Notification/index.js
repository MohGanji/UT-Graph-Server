var express = require('express');
var router = express.Router();
var root = require('./root');
var idParam = require('./id');

router.use('/:id', idParam);
router.use('/', root);

module.exports = router;
