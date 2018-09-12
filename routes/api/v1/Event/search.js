var express = require('express');
var router = express.Router();
var searchController = require('../../../../controllers/Event/searchController');

router.get('/:keyword', searchController.eventSearch);

module.exports = router;
