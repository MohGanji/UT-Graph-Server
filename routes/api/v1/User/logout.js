var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/isAuthenticated');

var logoutController = require('../../../../controllers/User/logoutController');

router.post('/', isAuthenticated, logoutController.logout);

module.exports = router;
