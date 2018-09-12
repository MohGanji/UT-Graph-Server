var express = require('express');
var router = express.Router();
var search_controller = require('../../../../controllers/Event/searchController');

router.get('/:keyword', search_controller.event_search);

module.exports = router;
