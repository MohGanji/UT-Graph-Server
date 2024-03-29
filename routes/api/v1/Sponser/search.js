var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/isAuthenticated');
var searchController = require('../../../../controllers/Sponser/searchController');

router.get('/:keyword', isAuthenticated, searchController.sponserSearch);

module.exports = router;
