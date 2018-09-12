var express = require('express');
var router = express.Router();
var searchController = require('../../../../controllers/User/searchController');

router.get('/:keyword', searchController.searchUser);

module.exports = router;
