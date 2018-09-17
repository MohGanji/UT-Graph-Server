var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/isAuthenticated');
var rootController = require('../../../../controllers/Sponser/rootController');

router.get('/', isAuthenticated, rootController.getSponser);

router.post('/', isAuthenticated, rootController.createSponser);

module.exports = router;
