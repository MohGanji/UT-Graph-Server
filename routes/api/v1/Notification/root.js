var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/isAuthenticated');
var rootController = require('../../../../controllers/Notification/rootController');

router.get('/:status', isAuthenticated, rootController.getStatus);

router.post('/read-all', isAuthenticated, rootController.markAllAsRead);

module.exports = router;
